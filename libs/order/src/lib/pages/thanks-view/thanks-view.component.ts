import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';


@Component({
  selector: 'frontend-thanks-view',
  templateUrl: './thanks-view.component.html'
})
export class ThanksViewComponent implements OnInit {

  evaluation = false
  constructor(
    private router: Router
  ) { 
    this.router.url.includes('evaluation') ? (this.evaluation = true) : (this.evaluation = false);


  }

  ngOnInit(): void {
  }

}
