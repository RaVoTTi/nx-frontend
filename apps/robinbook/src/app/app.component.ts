import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@frontend/auth-base';

@Component({
  selector: 'robinbook-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.loginJWT();
  }
}
