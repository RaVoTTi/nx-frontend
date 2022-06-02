import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { BookService } from '@frontend/product';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'robinbook-books-view',
  templateUrl: './books-view.component.html',
})
export class BooksViewComponent implements OnInit {
  rawUrl = environment.rawUrl
  book!: IBook;
  bookId!: string;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.bookId = params['id'];
        this.bookService
          .getBookByIdUser(this.bookId)
          .pipe(take(1))
          .subscribe(({ result }) => {
            if (result) {
              this.book = result;
            }
          });
      }
    });
  }
  back(){
    this.location.back()
  }
}
