import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@celebal/orders';
import { ProductsService } from '@celebal/products';
import { UsersService } from '@celebal/users';
import { Subject, combineLatest, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endsubs$ : Subject<any> = new Subject();
  constructor(private userService: UsersService, private productService: ProductsService, private ordersService: OrdersService){}

  ngOnInit(): void{
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endsubs$)).subscribe((values) => {
      this.statistics = values;
    })
  }

  ngOnDestroy(): void {
    this.endsubs$.complete();
  }
}


