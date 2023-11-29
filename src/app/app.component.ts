import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rod-manager-ui';

  constructor(private router: Router) {}

  isHomeComponentActive(): boolean {
    return this.router.url.includes('home') || this.router.url.includes('garden-offers');
  }

  isCalendarComponentActive(): boolean {
    return this.router.url.includes('calendar')|| this.router.url.includes('404')|| this.router.url.includes('403');
  }
}
