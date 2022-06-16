import { Component, OnInit } from '@angular/core';
import { AuthService } from '@frontend/auth';

@Component({
  selector: 'robinbook-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor( private authService: AuthService){

  }
  ngOnInit(): void {
      this.authService.initAppSession()
  }
}
