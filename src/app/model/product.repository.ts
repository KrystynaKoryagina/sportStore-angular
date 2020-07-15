import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from './rest.datasourse';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource) {
    this.dataSource.getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.categories = products.map(product => product.category)
          .filter((category, index, array) => array.indexOf(category) === index).sort();
      });
  }

  getProducts(category: string = null): Product[] {
    return this.products
      .filter(product => category === null || category === product.category);
  }

  getProductById(id: number): Product {
    return this.products.find(product => product.id === id);
  }

  getCategories(): string[] {
    return this.categories;
  }

  saveProduct(product: Product) {
    if (product.id === null || product.id === 0) {
      this.dataSource.saveProduct(product)
        .subscribe(p => this.products.push(p));
    } else {
      this.dataSource.updateProduct(product)
        .subscribe(p => {
          this.products.splice(this.products.findIndex(item => item.id === p.id), 1, product);
        });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id)
      .subscribe(() => {
        this.products.splice(this.products.findIndex(p => p.id === id), 1);
    });
  }
}
