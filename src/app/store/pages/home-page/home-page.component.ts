import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { ProductsService } from '@/products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {
  productsService = inject(ProductsService);

  productsResource = rxResource({
    // reactive input
    params: () => ({
      limit: 9,
      offset: 0,
      gender: '',
    }),

    // actual API call using params
    stream: ({ params }) => this.productsService.getProducts(params),

  });
}
