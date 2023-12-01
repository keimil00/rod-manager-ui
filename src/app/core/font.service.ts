import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  private root = document.documentElement;

  setBigSize() {
    this.root.style.setProperty('--main-font', '1.5rem');
  }
  setNormalSize() {
    this.root.style.setProperty('--main-font', '1rem');
  }
  constructor() { }
}
