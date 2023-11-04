import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-person-card-garden',
  templateUrl: './person-card-garden.component.html',
  styleUrls: ['./person-card-garden.component.scss']
})
export class PersonCardGardenComponent {
  @Input() position: string;
  @Input() name: string;
  @Input() phoneNumber: string;
  @Input() email: string;

  constructor() {
    this.position = '';
    this.name = '';
    this.phoneNumber = '';
    this.email = '';
  }
}

