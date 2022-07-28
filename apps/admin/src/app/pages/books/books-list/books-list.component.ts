
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { BookService } from '@frontend/book-admin';
import {IBook} from 'interfaces' 
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs';
@Component({
  selector: 'admin-books-list',
  templateUrl: './books-list.component.html'
})
export class BooksListComponent implements OnInit {
  books: IBook[] = [];
  RAW_URL = environment.RAW_URL
  
  constructor(
    private bookService: BookService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) {}

  ngOnInit(): void {
    this._getBooks();
    
  }

  deleteBook(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Book?',
      header: 'Delete Book',
      icon: 'pi pi-danger',
      accept: () => {
        this.bookService.deleteBook(id).pipe(take(1)).subscribe((response) => {
          if (response.ok === true) {
            this._getBooks();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.msg[0],
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.msg[0] as string
                | 'The Book could not be eliminated',
            });
          }
        });
      },
    });
  }
  _getBooks() {
    this.bookService.getBooks('both').pipe(take(1)).subscribe((response) => {
      this.books = response.result ? response.result : [] ;
    });
  }

}
