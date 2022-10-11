import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'interfaces';

@Component({
  selector: 'frontend-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements OnInit {

  constructor() { }

  @Input() items! : IItem[]

  ngOnInit(): void {
  }

}
