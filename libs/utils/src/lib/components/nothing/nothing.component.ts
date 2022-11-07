import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'frontend-nothing',
  templateUrl: './nothing.component.html'
})
export class NothingComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  redirect(){
    this.router.navigate(['/app/books'])
  }

}
