import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {GardenOffer} from "./garden-offer.model";

@Component({
  selector: 'app-garden-offers',
  templateUrl: './garden-offers.component.html',
  styleUrls: ['./garden-offers.component.scss']
})
export class GardenOffersComponent {
  isCreatingOffer: boolean = false;
  defaultPageSize: number = 10;
  totalOffersCount: number = 0;
  gardenOffersNames: string[] = [];
  searchControl: FormControl = new FormControl();
  gardenOffers: GardenOffer[] = [];

  createOffer() {

  }

  fetchData() {

  }

  updateSearchControl($event: Event) {
    this.searchControl.setValue(($event.target as HTMLInputElement).value);
  }
}
