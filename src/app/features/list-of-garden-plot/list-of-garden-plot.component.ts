import {Component} from '@angular/core';
import {GardenPlot} from './garden-plot';
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";
import {gardenPlots} from "./GardenService";
import {profiles} from "../list-of-users/ProfilesService";

@Component({
  selector: 'app-list-of-garden-plot',
  templateUrl: './list-of-garden-plot.component.html',
  styleUrls: ['./list-of-garden-plot.component.scss']
})
export class ListOfGardenPlotComponent {
  displayedColumns: string[] = ['sector', 'avenue', 'number', 'area', 'leaseholder', 'add', 'status', 'info'];
  dataSource: MatTableDataSource<GardenPlot>;

  getLeaseholderName(leaseholderID: string): any {
    const leaseholder = profiles.find(profile => profile.id === leaseholderID);
    if (leaseholder) {
      return `${leaseholder.firstName} ${leaseholder.lastName}`;
    }
    return null;
  }

  showDetails: boolean = false;
  showAddingLeaseHolder: boolean = false;
  showAddingGardenPlot: boolean = false;
  selectedGardenPlot: GardenPlot | undefined;// Wybrana działka
  selectedLeaseholder: Profile | undefined; // Wybrany dzierżawca

  selectDetails(gardenPlot: GardenPlot) {
    this.selectedGardenPlot = gardenPlot;
    this.selectedLeaseholder = this.findLeaseholderById(gardenPlot.leaseholderID) || undefined;
    this.showDetails = true;
  }

  selectAddingLeaseHolder(gardenPlot: GardenPlot) {
    this.selectedGardenPlot = gardenPlot;
    this.showAddingLeaseHolder = true;
  }

  selectAddingGardenPlot() {
    this.showAddingGardenPlot = true;
  }

  findLeaseholderById(id: string | null): Profile | null {
    return profiles.find(profile => profile.id === id) || null;
  }

  constructor() {
    this.dataSource = new MatTableDataSource(gardenPlots);
  }

  closeDetails() {
    this.showDetails = false;
  }

  closeAddingLeaseHolder() {
    this.showAddingLeaseHolder = false;
  }

  closeAddingGardenPlot() {
    this.showAddingGardenPlot = false;
  }
}

