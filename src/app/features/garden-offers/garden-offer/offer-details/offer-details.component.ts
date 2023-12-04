import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact, GardenData, GardenInfo} from "../../garden-offer.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GardenOffersService} from "../../garden-offers.service";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  @Input() gardenInfo?: GardenInfo
  @Input() edit: boolean = false;

  @Output() gardenInfoEmitter = new EventEmitter<GardenInfo>();

  displayedColumns: string[] = ['postNumber', 'address', 'area', 'price', 'predictedRent'];
  dataSource = new MatTableDataSource<GardenInfo>()

  detailsForm: FormGroup;
  gardenForm: FormGroup;

  sectors: string[] = [];
  avenues: string[] = [];
  numbers: number[] = [];

  availableGardens: GardenData[] = [];

  constructor(private fb: FormBuilder, private gardenOffersService: GardenOffersService) {
    this.detailsForm = this.fb.group({
      id: [null],
      price: [null],
      predicted_rent: [null]
    });
    this.gardenForm = this.fb.group({
      sector: [''],
      avenue: [''],
      number: [null],
    });
    this.gardenOffersService.fetchAvailableGardens()
      .subscribe({
        next: value => {
          this.availableGardens = value;
          this.sectors = Array.from(new Set(value.map((garden) => garden.sector)));
        }
      });
  }

  ngOnInit(): void {
    if (!this.edit && this.gardenInfo) {
      this.dataSource.data = [this.gardenInfo];
    }
  }

  updateAvenues() {
    this.avenues = Array.from(new Set(this.availableGardens
      .filter((garden) => garden.sector === this.gardenForm.get('sector')?.value)
      .map((garden) => garden.avenue)));
  }

  updateNumbers() {
    this.numbers = Array.from(new Set(this.availableGardens
      .filter((garden) => garden.avenue === this.gardenForm.get('avenue')?.value && garden.sector === this.gardenForm.get('sector')?.value)
      .map((garden) => garden.number)));
  }

  selectGarden() {
    this.detailsForm.patchValue({id: this.availableGardens.find((garden) =>
        garden.sector === this.gardenForm.get('sector')?.value &&
        garden.avenue === this.gardenForm.get('avenue')?.value &&
        garden.number === this.gardenForm.get('number')?.value
      )?.id})
  }

  retrieveGardenInfo() {
    return {
      id: this.detailsForm.get('id')?.value,
      price: this.detailsForm.get('price')?.value,
      predicted_rent: this.detailsForm.get('predicted_rent')?.value
    }
  }
}
