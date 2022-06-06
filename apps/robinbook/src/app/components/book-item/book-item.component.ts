import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'robinbook-book-item',
  templateUrl: './book-item.component.html'
})
export class BookItemComponent implements OnInit {
  rawUrl = environment.rawUrl
  @Input() book! : IBook;
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
    
    ];
    }
  save(severity: string) {
    this.messageService.add({severity:severity, summary:'Success', detail:'Data Saved'});
}



}
