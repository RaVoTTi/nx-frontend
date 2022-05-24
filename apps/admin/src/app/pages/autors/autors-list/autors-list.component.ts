import { Component, OnInit } from '@angular/core';
import { AutorService } from '@frontend/product';
import {IAutor} from '../../../../../../../interfaces' 
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs';
@Component({
  selector: 'admin-autors-list',
  templateUrl: './autors-list.component.html'
})
export class AutorsListComponent implements OnInit {

  autors: IAutor[] = [];
  constructor(
    private autorService: AutorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getAutors();
  }

  deleteAutor(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Autor?',
      header: 'Delete Autor',
      icon: 'pi pi-danger',
      accept: () => {
        this.autorService.deleteAutor(id).pipe(take(1)).subscribe((response) => {
          if (response.ok === true) {
            this._getAutors();
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
                | 'The Autor could not be created',
            });
          }
        });
      },
    });
  }
  _getAutors() {
    this.autorService.getAutors('both').pipe(take(1)).subscribe((response) => {
      this.autors = response.result ? response.result : [] ;
    });
  }
}
