import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  private root = document.documentElement;

  setFontSize(ratio: number) {
    this.root.style.setProperty('--main-font', `${ratio}rem`);
    this.root.style.setProperty('--10-font', `${10 * ratio}px`);
    this.root.style.setProperty('--11-font', `${11 * ratio}px`);
    this.root.style.setProperty('--12-font', `${12 * ratio}px`);
    this.root.style.setProperty('--13-font', `${13 * ratio}px`);
    this.root.style.setProperty('--14-font', `${14 * ratio}px`);
    this.root.style.setProperty('--16-font', `${16 * ratio}px`);
    this.root.style.setProperty('--17-font', `${17 * ratio}px`);
    this.root.style.setProperty('--18-font', `${18 * ratio}px`);
    this.root.style.setProperty('--20-font', `${20 * ratio}px`);
    this.root.style.setProperty('--22-font', `${22 * ratio}px`);
    this.root.style.setProperty('--25-font', `${25 * ratio}px`);
    this.root.style.setProperty('--30-font', `${30 * ratio}px`);
    this.root.style.setProperty('--32-font', `${32 * ratio}px`);
    this.root.style.setProperty('--36-font', `${36 * ratio}px`);
    this.root.style.setProperty('--h2-font', `${1.8 * ratio}em`);
    this.root.style.setProperty('--h6-font', `${0.9 * ratio}em`);
  }

  setBigSize() {
    this.setFontSize(1.3);
  }

  setNormalSize() {
    this.setFontSize(1);
  }
  constructor() { }
}
