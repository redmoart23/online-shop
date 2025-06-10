import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { ProductsService } from '@/products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    // reactive input
    params: () => ({
      limit: 9,
      offset: 9 * (this.paginationService.currentPage() - 1),
      gender: '',
    }),

    // actual API call using params
    stream: ({ params }) => this.productsService.getProducts(params),
  });
}
