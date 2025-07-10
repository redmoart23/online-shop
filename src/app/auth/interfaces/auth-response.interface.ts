import { User } from './users.interface';

export interface AuthResponse {
  user: User;
  token: string;
}
