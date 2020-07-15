import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/model/product.model';
import { ProductRepository } from 'src/app/model/product.repository';


@Component({
    templateUrl: './product-editor.component.html'
})
export class ProductEditorComponent {
    editing = false;
    product: Product = new Product();

    constructor(
      private productRepository: ProductRepository,
      private router: Router,
      private activeRoute: ActivatedRoute
    ) {

      this.editing = this.activeRoute.snapshot.params['mode'] === 'edit';

      if (this.editing) {
        // Object.assign(this.product, this.productRepository.getProductById(Number(this.activeRoute.snapshot.params['id'])));
        this.product = {
          ...this.product,
          ...this.productRepository.getProductById( Number(this.activeRoute.snapshot.params['id']))
        };
      }
    }

    save(form: NgForm): void {
      this.productRepository.saveProduct(this.product);
      this.router.navigate(['/admin/main/products']);
    }
}
