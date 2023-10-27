import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Profile} from "../../Profile";
import {GardenPlot} from "../garden-plot";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-garden-plot-details',
  templateUrl: './garden-plot-details.component.html',
  styleUrls: ['./garden-plot-details.component.scss']
})
export class GardenPlotDetailsComponent implements OnInit {
  @Input() gardenPlot: GardenPlot | undefined; // Przekaż dane działki jako wejście
  @Input() leaseholder: Profile | undefined; // Przekaż dane dzierżawcy jako wejście
  @Output() closeDetails = new EventEmitter<void>();

  constructor() {
    this.gardenPlot = undefined; // Inicjalizuj pole gardenPlot
    this.leaseholder = undefined; // Inicjalizuj pole leaseholder
  }

  ngOnInit() {
    // Możesz tutaj przypisać dane dzierżawcy i płatności z backendu, jeśli to konieczne
  }

  showPaymentHistory() {
    // Otwórz historię płatności (to możesz zaimplementować w oddzielnym komponencie)
  }


  leaseholderProperties: MatTableDataSource<Property> | undefined;
  paymentData: MatTableDataSource<Property> | undefined;



}
interface Property {
  label: string;
  value: any;
}


