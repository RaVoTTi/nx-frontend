import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'robinbook-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  home!: boolean;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(
        (event: NavigationEnd) => {
          event.url.includes('home') ||
          event.url.includes('settings') ||
          event.url.includes('myorders')
            ? (this.home = true)
            : (this.home = false);
        }

        // url.
      );
  }
}
