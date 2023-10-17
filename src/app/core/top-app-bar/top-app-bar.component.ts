import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss']
})
export class TopAppBarComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(private router: Router) {}

  navigate(path: string){
    this.router.navigate([path]);
  }

  openMenu() {
    console.log('open menu')
    this.trigger.openMenu();
  }

  closeMenu() {
    console.log('close menu')
    this.trigger.closeMenu();
  }
}
