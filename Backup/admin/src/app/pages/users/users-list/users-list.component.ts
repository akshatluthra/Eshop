import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@celebal/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {

  users = [];

  constructor(private userService: UsersService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router ){}

  ngOnInit():void {
    this._getUsers();
  }

  private _getUsers(){
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }
  deleteUser(userId: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe(() => {
          this._getUsers();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted' });
        },()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      
        })
      }
  });
   
  }
  
  updateUser(userId: string){
    this.router.navigateByUrl(`users/form/${userId}`)
  }

}
