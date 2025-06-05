import { Component, input } from '@angular/core';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'product-carousel',
  imports: [],
  templateUrl: './product-carousel.component.html',
  styles: ``,
})
export class ProductCarouselComponent {
  images = input.required<string[]>();
}
