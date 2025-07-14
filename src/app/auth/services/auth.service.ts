import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@auth/interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    params: () => ({}),
    stream: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    return this._user() ? 'authenticated' : 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());

  token = computed<string | null>(() => this._token());


  login(email: string, password: string): Observable<boolean> {
    this._authStatus.set('checking');
    return this.http
      .post<AuthResponse>('http://localhost:4000/api/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((resp) => this.handleAuthSuccess(resp)),
        map(() => true),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  register(fullName: string, email: string, password: string) {
    this._authStatus.set('checking');
    return this.http
      .post<AuthResponse>('http://localhost:4000/api/auth/register', {
        fullName,
        email,
        password,
      })
      .pipe(
        tap((resp) => this.handleAuthSuccess(resp)),
        map(() => true),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http
      .get<AuthResponse>('http://localhost:4000/api/auth/check-status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((resp) => this.handleAuthSuccess(resp)),
        map(() => true),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');

    localStorage.setItem('token', token);
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
