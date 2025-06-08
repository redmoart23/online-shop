import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCarouselComponent } from '../../../products/components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
  styles: ``,
})
export class ProductPageComponent {
  productId = inject(ActivatedRoute).snapshot.params['idSlug'];
  productsService = inject(ProductsService);

  productResource = rxResource({
    params: () => ({
      id: this.productId,
    }),
    stream: () => this.productsService.getProductByIdSlug(this.productId),
  });
}
