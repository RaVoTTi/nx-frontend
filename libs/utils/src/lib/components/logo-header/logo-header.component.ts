import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'frontend-logo-header',
  templateUrl: './logo-header.component.html'
})
export class LogoHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redirect(){
    this.router.navigate(['/app/books'])
  }

}
