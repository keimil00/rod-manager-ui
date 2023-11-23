import {Component, Input, Sanitizer} from '@angular/core';
import {GardenOffer} from "../garden-offer.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-garden-offer',
  templateUrl: './garden-offer.component.html',
  styleUrls: ['./garden-offer.component.scss']
})
export class GardenOfferComponent {
  @Input() offer!: GardenOffer;

  constructor(public sanitizer: DomSanitizer) {
  }

}
