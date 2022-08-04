import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[errorMsg]',
})
export class ErrorMsgDirective implements OnInit {
  private _msg = 'This field is required';
  private _color = 'red';

  @Input() set errorMsg(value: string | null) {
    if (value) {
      this._msg = value;
      this.setMsg();
      this.element.nativeElement.classList.remove('hidden');
    } 
    else {
      this.element.nativeElement.classList.add('hidden');
    }

  }

  element: ElementRef<HTMLElement>;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.element = elementRef;
  }
  ngOnInit(): void {
    this.setClass()
    this.setColor()
    this.element.nativeElement.classList.add('hidden');

  }

  setMsg() {
    this.element.nativeElement.innerText = this._msg;
  }

  setColor() {
    this.element.nativeElement.style.color = this._color;
  }

  setClass() {
    this.element.nativeElement.style.fontSize = '.8rem';
  }
}
