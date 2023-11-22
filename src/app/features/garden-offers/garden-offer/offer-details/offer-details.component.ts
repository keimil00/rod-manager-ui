import {Component, Input} from '@angular/core';
import {Contact, GardenInfo} from "../../garden-offer.model";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent {
  @Input() gardenInfo!: GardenInfo
  @Input() edit: boolean = false;
}
