import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Order, OrdersService} from '@celebal/orders';
import { ORDER_STATUS } from '../order.constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit, OnDestroy {
orders: Order[] = [];
endsubs$: Subject<any> = new Subject();
orderStatus = ORDER_STATUS;
constructor(private ordersService: OrdersService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService){}

ngOnInit(): void {
  this._getOrders();
}

ngOnDestroy(): void {
  this.endsubs$.complete();
}

_getOrders() {
  this.ordersService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe((orders) => {
    this.orders = orders;
  });
}
showOrder(orderId){
  this.router.navigateByUrl(`orders/${orderId}`)
}

deleteOrder(orderId: string){
  this.confirmationService.confirm({
    message: 'Do you want to delete this User?',
    header: 'Delete User',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.ordersService.deleteOrder(orderId).subscribe(() => {
        this._getOrders();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted' });
      },()=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    
      })
    }
});
 
}
}
