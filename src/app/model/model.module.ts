import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductRepository } from './product.repository';
import { StaticDataSourse } from './static.datasourse';
import { Cart } from './cart.model';
import { OrderRepository } from './order.repository';
import { Order } from './order.model';
import { RestDataSource } from './rest.datasourse';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ProductRepository,
    Cart,
    Order,
    OrderRepository,
    RestDataSource,
    AuthService,
    // StaticDataSourse
    { provide: StaticDataSourse, useClass: RestDataSource }
  ]
})
export class ModelModule {}
