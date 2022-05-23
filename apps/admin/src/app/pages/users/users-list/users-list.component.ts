import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { UserService } from '@frontend/user-admin';
import { IUser } from 'interfaces';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  users: IUser[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this User?',
      header: 'Delete User',
      icon: 'pi pi-danger',
      accept: () => {
        this.userService.deleteUser(id).subscribe((response) => {
          if (response.ok === true) {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.msg[0],
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.msg[0] as
                | string
                | 'The User could not be eliminated',
            });
          }
        });
      },
    });
  }
  _getUsers() {
    this.userService.getUsers('both').subscribe((response) => {
      this.users = response.result ? response.result : [];
    });
  }
}
