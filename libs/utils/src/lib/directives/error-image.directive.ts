import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[errorImage]',
})
export class ErrorImageDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('error')
  defaultImage(){
    
    const element =  this.elementRef.nativeElement
    element.src = '../assets/home-image.png'
  }
}
