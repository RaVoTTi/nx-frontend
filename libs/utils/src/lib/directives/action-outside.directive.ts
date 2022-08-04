// import { Directive, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// @Directive({
//   selector: '[actionOutside]',
// })
// export class ActionOutsideDirective {
//   private _show = false;

//   @Input() set actionOutside(condition: boolean) {
//     this._show = condition;
//     if (this._show) {
//       this.show();
//     } else {
//       this.clear();
//     }
//   }

//   constructor(
//     private templateRef: TemplateRef<HTMLElement>,
//     private viewContainer: ViewContainerRef
//   ) {}

//   show() {
//     this.viewContainer.createEmbeddedView(this.templateRef);
//   }
//   clear() {
//     this.viewContainer.clear();
//   }
//   @HostListener('document:click', ['$event'])
//   public onClick(event: any){
//     const clickedInside = this.templateRef.elementRef.nativeElement.contains(event?.target);
//     if(!clickedInside){
//       // this.clear()
//       console.log('vas')
//     }
//   }
// }

import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[actionOutside]',
})
export class ActionOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() actionOutside = new EventEmitter<void>();

  documentClickSubscription: Subscription | undefined;
  windowScrollSubscription: Subscription | undefined;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter((event) => {
          return !this.isInside(event.target as HTMLElement);
        })
      )
      .subscribe(() => {
        this.actionOutside.emit();
      });
    this.windowScrollSubscription = fromEvent(window, 'scroll')
    // .pipe(
    //   filter((event) => {
    //     return !this.isInside(event.target as HTMLElement);
    //   })
    // )
    .subscribe(() => {
      this.actionOutside.emit();
    });
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
    this.windowScrollSubscription?.unsubscribe();

  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }
}
