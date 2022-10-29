import { Component, OnInit } from '@angular/core';
import { selectAllBooks, selectBooksById } from '@frontend/book-base';
import { select, Store } from '@ngrx/store';
import { IItem, ILearning, IOrder } from 'interfaces';
import { Observable, take } from 'rxjs';
import { MyLearningService } from '../../services/my-learning.service';
import { selectAllMyLearnings } from '../../state/my-learnings.selectors';

@Component({
  selector: 'frontend-my-learning-list',
  templateUrl: './my-learning-list.component.html',
})
export class MyLearningListComponent implements OnInit {
  allMyLearnings$!: Observable<IOrder[]> ;
  allMyBooks$!: Observable<ILearning[]> ;



  constructor(private myLearningService: MyLearningService, private store: Store) {}

  ngOnInit(): void {

    this.reload()
  }
  reload() {
    this.store.pipe(select(selectAllMyLearnings)).subscribe((learnings)=> {
      console.log(learnings[0].book.content)
    })
    
    // this.store.pipe(select(selectAllBooks)).subscribe(books => console.log(books))
    // this.store.pipe(select(selectBooksById('628baabfa677e11d6cd180e4'))).subscribe(myLearning => console.log(myLearning))

  }
}
