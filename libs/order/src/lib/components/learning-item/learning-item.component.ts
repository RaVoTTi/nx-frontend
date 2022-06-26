import { IOrder } from '../../../../../../interfaces/IOrder';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from '@env/environment';

@Component({
  selector: 'frontend-learning-item',
  templateUrl: './learning-item.component.html',
})
export class LearningItemComponent {
  
  rawUrl = environment.rawUrl
  
  @Input() order!: IOrder;

  items: MenuItem[] = [];

  constructor(
  ) {}


  }
