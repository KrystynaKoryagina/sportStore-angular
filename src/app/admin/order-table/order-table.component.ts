import { Component } from '@angular/core';
import { OrderRepository } from 'src/app/model/order.repository';
import { Order } from 'src/app/model/order.model';

@Component({
  templateUrl: './order-table.component.html'
})
export class OrderTableComponent {
  isShipping = false;

  constructor(private orderRepository: OrderRepository) {}

  get orders(): Order[] {
    return this.orderRepository.getOrders()
      .filter(order => this.isShipping || !order.shipped);
  }

  markShipped(order: Order) {
    order.shipped = true;
    this.orderRepository.updateOrder(order);
  }

  delete(id: number) {
    this.orderRepository.deleteOrder(id);
  }
}
