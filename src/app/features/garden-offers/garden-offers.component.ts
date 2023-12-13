import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Filters, GardenOffer, GardenOfferCreate, GardenOfferExternal, MinMax} from "./garden-offer.model";
import {GardenOffersService} from "./garden-offers.service";
import {map, Observable} from "rxjs";
import {MatSelectChange} from "@angular/material/select";
import {Role} from "../register/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {GardenPlotWithLeaseholder} from "../list-of-garden-plot/garden-plot";

@Component({
  selector: 'app-garden-offers',
  templateUrl: './garden-offers.component.html',
  styleUrls: ['./garden-offers.component.scss']
})
export class GardenOffersComponent {
  isCreatingOffer: boolean = false;
  currentPageSize: number = 10;
  currentPageIndex: number = 1;
  totalOffersCount: number = 0;
  searchControl: FormControl = new FormControl();
  // @ts-ignore
  gardenOffers$: Observable<GardenOffer[]>;
  minMax?: MinMax;
  isCreating: boolean = false;
  panelOpenState: boolean = false;
  filters = new Filters();
  defaultSort = 'newest';


  constructor(private gardenOffersService: GardenOffersService) {
    this.gardenOffersService.fetchMinMax().subscribe({
      next: value => {
        this.minMax = value;
      },
      error: err => {
        console.log(err);
      }
    });
    this.fetchData(this.currentPageIndex, this.currentPageSize);
  }

  createOffer() {
    this.isCreating = true;
  }

  fetchData(index: number, size: number) {
    this.currentPageIndex = index;
    this.currentPageSize = size;
    this.gardenOffers$ = this.gardenOffersService.fetchGardenOffers(this.currentPageIndex, this.currentPageSize)
      .pipe(
        map((value) => {
          this.totalOffersCount = value.count;
          return value.results.map(garden => this.populateID(garden));
        })
      );
  }

  private populateID(garden: GardenOfferExternal): GardenOffer {
    console.log(JSON.stringify(garden));
    return {
      title: garden.title,
      body: garden.body,
      contact: garden.contact,
      gardenInfo: {
        postNumber: garden.id,
        address: garden.garden_info.address,
        area: garden.garden_info.area,
        price: garden.garden_info.price,
        predictedRent: garden.garden_info.predicted_rent
      },
      createdAt: garden.created_at
    };
  }

  updateSearchControl($event: Event) {
    this.searchControl.setValue(($event.target as HTMLInputElement).value);
  }

  onCancel() {
    this.isCreating = false;
  }

  onOfferCreated(offer: GardenOfferCreate) {
    this.gardenOffersService.createGardenOffer(offer)
      .subscribe({
        next: data => {
          this.updateData();
        },
        error: error => {
          console.error(error);
        }
      });
    this.isCreating = false;
  }

  onSortChange(event: MatSelectChange) {
    switch (event.value) {
      case 'newest':
        this.filters.sort_by = 'created_at';
        this.filters.sort_order = 'desc';
        break;
      case 'oldest':
        this.filters.sort_by = 'created_at';
        this.filters.sort_order = 'asc';
        break;
      case 'cheapest':
        this.filters.sort_by = 'price';
        this.filters.sort_order = 'asc';
        break;
      case 'expensive':
        this.filters.sort_by = 'price';
        this.filters.sort_order = 'desc';
        break;
    }
  }
  updateData() {
    this.fetchData(this.currentPageIndex, this.currentPageSize);
  }

  fetchWithFilters() {
    this.gardenOffers$ = this.gardenOffersService.fetchGardenOffersWithFilters(this.currentPageIndex, this.currentPageSize, this.filters)
      .pipe(
        map((value) => {
          this.totalOffersCount = value.count;
          return value.results.map(garden => this.populateID(garden));
        })
      )
  }

    protected readonly Role = Role;
}
