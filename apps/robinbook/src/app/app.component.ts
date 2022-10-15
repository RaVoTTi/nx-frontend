import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthBaseService } from '@frontend/auth-base';

@Component({
  selector: 'robinbook-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private authBaseService: AuthBaseService, private router: Router) {}
  ngOnInit(): void {
    this.authBaseService.loginJWT();
  }
}
