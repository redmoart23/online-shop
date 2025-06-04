import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): any {
    if (typeof value === 'string') {
      return `${environment.baseUrl}/files/product/${value}`;
    }

    const image = value[0];

    if (!image) {
      return `${environment.baseUrl}/files/product/no-image.png`;
    }

    return `${environment.baseUrl}/files/product/${image}`;
  }
}
