import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from '@env/environment';
import { IBook, ILearning } from '@frontend/utils';

@Component({
  selector: 'frontend-card-learning',
  templateUrl: './card-learning.component.html',
})
export class LearningItemComponent {
  
  RAW_URL = environment.RAW_URL
  
  @Input() learning!: ILearning;
  @Input() book!: IBook | undefined; // TODO


  items: MenuItem[] = [];

  constructor(
  ) {}


  }
