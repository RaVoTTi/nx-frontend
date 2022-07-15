import { IOrder } from '../../../../../../interfaces/IOrder';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from '@env/environment';

@Component({
  selector: 'frontend-card-learning',
  templateUrl: './card-learning.component.html',
})
export class LearningItemComponent {
  
  RAW_URL = environment.RAW_URL
  
  @Input() order!: IOrder;

  items: MenuItem[] = [];

  constructor(
  ) {}


  }
