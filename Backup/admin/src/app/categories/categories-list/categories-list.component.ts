import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoriesService, Category} from '@celebal/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endsubs$ : Subject<any> = new Subject();
  position = 'center';
  
constructor(private categoryService: CategoriesService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router){}
  ngOnDestroy(): void {
    this.endsubs$.complete();
  }

ngOnInit(): void{
this._getCategories()
}

deleteCategory(categoryId: string){
  this.confirmationService.confirm({
    message: 'Do you want to delete this Category ?',
    header: 'Delete Category',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.categoryService.deleteCategory(categoryId).subscribe(() => {
        this._getCategories();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted' });
      },()=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    
      })
    }
});
 
}

updateCategory(categoryid: string){
  this.router.navigateByUrl(`categories/form/${categoryid}`)
}

private _getCategories(){
  this.categoryService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(cats => {
    this.categories = cats;
  })
}
}
