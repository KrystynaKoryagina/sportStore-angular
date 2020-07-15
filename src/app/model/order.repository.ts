import { Injectable } from '@angular/core';

import { Order } from './order.model';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasourse';

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded = false;

  constructor(private dataSource: RestDataSource) {}

  private loadOrders(): void {
    this.loaded = true;
    this.dataSource.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  getOrders(): Order[] {
    if (!this.loaded) {
      this.loadOrders();
    }

    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }

  updateOrder(order: Order) {
    this.dataSource.updateOrder(order)
      .subscribe(o => {
        this.orders.splice(this.orders.findIndex(item => item.id === o.id), 1, order);
    });
  }

  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id)
      .subscribe(() => {
        this.orders.splice(this.orders.findIndex(order => id === order.id), 1);
    });
  }
}
