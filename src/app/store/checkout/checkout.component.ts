import { Component, OnInit } from '@angular/core';
import { OrderRepository } from 'src/app/model/order.repository';
import { Order } from 'src/app/model/order.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  isOrderSent = false;
  isSubmitted = false;

  constructor(
    private orderRepository: OrderRepository,
    public order: Order
  ) {}

  submitOrder(form: NgForm) {
    this.isSubmitted = true;

    if (form.valid) {
      this.orderRepository.saveOrder(this.order)
        .subscribe(() => {
          this.order.clear();
          this.isOrderSent = true;
          this.isSubmitted = false;
        });
    }
  }
}
