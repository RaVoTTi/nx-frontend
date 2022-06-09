import { IOrder } from '../../../../../../interfaces/IOrder';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from '@env/environment';

@Component({
  selector: 'frontend-learning-item',
  templateUrl: './learning-item.component.html',
})
export class LearningItemComponent implements OnInit {
  
  rawUrl = environment.rawUrl
  
  @Input() order!: IOrder;

  items: MenuItem[] = [];

  constructor(
  ) {}

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
  }
