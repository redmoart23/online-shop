import { Component, inject, signal } from '@angular/core';
import { ProductsTablesComponent } from '@/products/components/products-tables/products-tables.component';
import { ProductsService } from '@/products/services/products.service';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { single } from 'rxjs';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductsTablesComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  productsPerPage = signal(10);

  productsResource = rxResource({
    // reactive input
    params: () => ({
      limit: this.productsPerPage(),
      offset:
        this.productsPerPage() * (this.paginationService.currentPage() - 1),
      gender: '',
    }),

    // actual API call using params
    stream: ({ params }) => this.productsService.getProducts(params),
  });
}
