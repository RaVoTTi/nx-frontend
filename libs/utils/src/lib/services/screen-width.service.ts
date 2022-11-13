import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenWidthService {


  constructor() {}


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }
}
