import { Component, OnInit } from '@angular/core';
import { AuthService } from 'libs/auth-base/src';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent  {
  constructor(private authService: AuthService) {}


  logout() {
    this.authService.logout('/auth/admin/login/pppp');
  }
}
