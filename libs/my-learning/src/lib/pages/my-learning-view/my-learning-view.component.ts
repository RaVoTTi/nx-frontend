import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILearning, IOrder } from 'interfaces';
import { take } from 'rxjs';
import { Location } from '@angular/common';
import { MyLearningService } from '../../services/my-learning.service';
import { select, Store } from '@ngrx/store';
import { runInThisContext } from 'vm';
import { selectMyLearningById } from '../../state/my-learnings.selectors';

@Component({
  selector: 'frontend-my-learning-view',
  templateUrl: './my-learning-view.component.html',
})
export class MyLearningViewComponent  {
  learning!: ILearning;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store,
    private router: Router
  ) {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.store
          .pipe(select(selectMyLearningById(params['id'])))
          .subscribe((learning) => {
            if (learning) {
              this.learning = learning;
            } else {
              this.router.navigate(['/app/mylearning']);
            }
          });
      } else {
        this.router.navigate(['/app/mylearning']);
      }
    });
  }

  // ngOnInit(): void {}

  evaluation(){
    this.router.navigate([`/app/mylearning/${this.learning._id}/myevaluation`])
  }

  back() {
    this.location.back();
  }
}
