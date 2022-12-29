import { Component, OnInit } from '@angular/core';
import { AuthBaseService } from '@frontend/auth-base';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent  {
  constructor(private authService: AuthBaseService) {}


  logout() {
    this.authService.logout('/auth/admin/login/pppp');
  }
}
