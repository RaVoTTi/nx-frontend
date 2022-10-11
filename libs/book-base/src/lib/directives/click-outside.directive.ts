import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { timer, take, fromEvent, filter, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[clickOutside]',
})
// implements AfterViewInit, OnDestroy
export class ClickOutsideDirective {
  

  @Output() public clickOutside = new EventEmitter();
  documentClickSubscription: Subscription | undefined;
  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) 
  {}
  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter((event) => {
          return !this.isInside(event.target as HTMLElement);
        })
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }
  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }
  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }

  // @HostListener('document:click', ['$event.target'])
  // public onClick(target: any) {
  //   const clickedInside = this.element.nativeElement.contains(target);

  //   if (!clickedInside) {
  //     this.clickOutside.emit(target);
  //   }
  // }
}
