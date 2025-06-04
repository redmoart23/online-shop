import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
  styles: ``,
})
export class ProductPageComponent {
  productId = inject(ActivatedRoute).snapshot.params['idSlug'];
  productsService = inject(ProductsService);

  productResource = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this.productsService.getProductByIdSlug(this.productId);
    },
  });
}
