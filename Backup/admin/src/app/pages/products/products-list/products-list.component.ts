import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@celebal/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
products = [];
endsubs$ : Subject<any> = new Subject();
constructor(private productService: ProductsService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router){}

ngOnInit(): void{
  this._getProducts();
}

ngOnDestroy(): void {
  this.endsubs$.complete();
}

private _getProducts(){
  this.productService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products => {
    this.products = products;
  })
}

deleteProduct(productId: string){
  this.confirmationService.confirm({
    message: 'Do you want to delete this Product ?',
    header: 'Delete Product',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.productService.deleteProduct(productId).subscribe(() => {
        this._getProducts();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is deleted' });
      },()=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    
      })
    }
});
 
}

updateProduct(productid: string){
  this.router.navigateByUrl(`products/form/${productid}`)
}
}
