import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
  styles: ``,
})
export class GenderPageComponent {
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);
  paginationService = inject(PaginationService);


  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource({
    // reactive input
    params: () => ({
      limit: 9,
      offset: 9 * (this.paginationService.currentPage() - 1),
      gender: this.gender(),
    }),

    // actual API call using params
    stream: ({ params }) => this.productsService.getProducts(params),
  });
}
