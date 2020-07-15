import { Component } from '@angular/core';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent {
  public selectedCategory: string = null;
  public productsPerPage = 4;
  public selectedPage = 1;

  constructor(
    private productRepository: ProductRepository,
    private cart: Cart,
    private router: Router
  ) {}

  get products(): Product[] {
    const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.productRepository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): string[] {
    return this.productRepository.getCategories();
  }

  changeCategory(newCategory?: string): void {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number): void {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return Math.ceil(this.productRepository.getProducts(this.selectedCategory).length / this.productsPerPage);
  }

  addProductToCart(product: Product): void {
    this.cart.addLine(product);

    this.router.navigate(['cart']);
  }

  // get pageNumbers(): number[] {
  //   return Array(Math.ceil(this.productRepository.getProducts(this.selectedCategory).length / this.productsPerPage))
  //     .fill(0).map((_, i) => i + 1);
  // }
}
