import { Product } from '@/products/interfaces/product.interface';
import { ProductImagePipe } from '@/products/pipes/product-image.pipe';
import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'products-tables',
  imports: [ ProductImagePipe, RouterLink, CurrencyPipe],
  templateUrl: './products-tables.component.html',
  styles: ``
})
export class ProductsTablesComponent {
  products = input.required<Product[]>();
}
