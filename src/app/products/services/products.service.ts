import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Gender,
  Product,
  ProductsResponse,
} from '../interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@/auth/interfaces/users.interface';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  description: '',
  slug: '',
  price: 0,
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  images: [],
  user: {} as User, // Assuming User is defined elsewhere
  tags: [],
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap((response) => console.log('Products fetched:', response.products)),
        tap((response) => this.productsCache.set(key, response))
      );
  }

  getProductByIdSlug(id: string): Observable<Product> {
    const key = id;
    if (this.productCache.has(key)) {
      return of(this.productCache.get(key)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      tap((response) => console.log('Product fetched:', response)),
      tap((response) => this.productCache.set(key, response))
    );
  }

  fetchProductById(id: string): Observable<Product> {
    const key = id;

    if (id === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache.has(key)) {
      return of(this.productCache.get(key)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      tap((response) => console.log('Product fetched:', response)),
      tap((response) => this.productCache.set(key, response))
    );
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http
      .patch<Product>(`${baseUrl}/products/${id}`, product)
      .pipe(tap((product) => this.updateProductCache(product)));
  }

  updateProductCache(product: Product): void {
    const productId = product.id;
    this.productCache.set(productId, product);

    this.productsCache.forEach((response) => {
      response.products = response.products.map((currentProduct) =>
        currentProduct.id === productId ? product : currentProduct
      );
    });

    console.log('Product updated:', product);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http
      .post<Product>(`${baseUrl}/products`, product)
      .pipe(tap((newProduct) => this.updateProductCache(newProduct)));
  }
}
