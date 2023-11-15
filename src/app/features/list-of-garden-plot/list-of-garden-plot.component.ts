import {Component, OnInit} from '@angular/core';
import {GardenPlot} from './garden-plot';
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";
import {gardenPlots} from "./GardenService";
import {profiles} from "../list-of-users/ProfilesService";
import {MatDialog} from "@angular/material/dialog";
import {GardenPlotDetailsComponent} from "./garden-plot-details/garden-plot-details.component";
import {GardenPlotAddLeaseholderComponent} from "./garden-plot-add-leaseholder/garden-plot-add-leaseholder.component";
import {GardenPlotListAddGardenComponent} from "./garden-plot-list-add-garden/garden-plot-list-add-garden.component";

@Component({
  selector: 'app-list-of-garden-plot',
  templateUrl: './list-of-garden-plot.component.html',
  styleUrls: ['./list-of-garden-plot.component.scss']
})
export class ListOfGardenPlotComponent {
  displayedColumns: string[] = ['sector', 'avenue', 'number', 'area', 'leaseholder', 'add', 'status', 'info'];
  dataSource: MatTableDataSource<GardenPlot>;

  showDetails: boolean = false;
  showAddingLeaseHolder: boolean = false;
  showAddingGardenPlot: boolean = false;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(gardenPlots);
    this.sortData()
  }

  sortData() {
    gardenPlots.sort((a, b) => {
      // @ts-ignore
      const sectorComparison = a.sector.localeCompare(b.sector);
      if (sectorComparison !== 0) {
        return sectorComparison;
      }

      // @ts-ignore
      const avenueComparison = a.avenue.localeCompare(b.avenue);
      if (avenueComparison !== 0) {
        return avenueComparison;
      }
      return a.number - b.number;
    });
    this.dataSource.data = gardenPlots;
  }

  getLeaseholderName(leaseholderID: string): any {
    const leaseholder = profiles.find(profile => profile.id === leaseholderID);
    if (leaseholder) {
      return `${leaseholder.firstName} ${leaseholder.lastName}`;
    }
    return null;
  }

  selectDetails(gardenPlot: GardenPlot) {
    const leaseholder = this.findLeaseholderById(gardenPlot.leaseholderID) || undefined;
    this.showDetails = true;
    this.showDetailsDialog(gardenPlot, leaseholder)
  }

  showDetailsDialog(gardenPlot: GardenPlot, leaseholder: Profile | undefined) {
    const dialogRef = this.dialog.open(GardenPlotDetailsComponent, {
      width: '4000px',
      data: {gardenPlot, leaseholder},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeDetails()
      this.sortData()
    });
  }

  selectAddingLeaseHolder(gardenPlot: GardenPlot) {
    this.showAddingLeaseHolder = true;
    this.showAddingLeaseHolderDialog(gardenPlot)
  }

  showAddingLeaseHolderDialog(gardenPlot: GardenPlot) {
    const dialogRef = this.dialog.open(GardenPlotAddLeaseholderComponent, {
      width: '4000px',
      data: {gardenPlot},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeAddingLeaseHolder()
      this.sortData()
    });
  }

  selectAddingGardenPlot() {
    this.showAddingGardenPlot = true;
    this.showAddingGardenPlotDialog()
  }

  showAddingGardenPlotDialog() {
    const dialogRef = this.dialog.open(GardenPlotListAddGardenComponent, {
      width: '4000px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.closeAddingGardenPlot()
    });
  }

  findLeaseholderById(id: string | null): Profile | null {
    return profiles.find(profile => profile.id === id) || null;
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

