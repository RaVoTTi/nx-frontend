import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from '../../interfaces/IItem';

interface IClick {
  url?: string;
  function?: CallableFunction;
}

@Component({
  selector: 'frontend-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() items!: IItem[];

  ngOnInit(): void {}

}
