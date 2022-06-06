import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'robinbook-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor( private messageService: MessageService) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Update', icon: 'pi pi-refresh', command: () => {
          console.log('asdasdsa');
      },},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
          console.log('asdasdsa');
      },},
      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {separator: true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];
  }

  save(severity: string) {
    this.messageService.add({severity:severity, summary:'Success', detail:'Data Saved'});
}
}
