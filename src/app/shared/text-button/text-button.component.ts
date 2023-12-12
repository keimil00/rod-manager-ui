import {Component, Input} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss']
})
export class TextButtonComponent {
  @Input() text: string = '';
  @Input() color: ThemePalette;
  @Input() className: string = '';
  @Input() type: string = '';
  @Input() disabled: boolean = false;


}
