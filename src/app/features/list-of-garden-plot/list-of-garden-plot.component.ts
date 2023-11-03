import {Component} from '@angular/core';
import {GardenPlot, PlotStatus} from './garden-plot';
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";
import {profiles} from "./garden-plot-list-add-garden/garden-plot-list-add-garden.component";

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

export let gardenPlots: GardenPlot[] = [
  {id: '1', sector: 'A', avenue: 'Avenue 1', number: 101, area: 500, leaseholderID: null, status: PlotStatus.Available},
  {id: '2', sector: 'B', avenue: 'Avenue 2', number: 201, area: 600, leaseholderID: null, status: PlotStatus.Available},
  {id: '3', sector: 'C', avenue: 'Avenue 3', number: 301, area: 750, leaseholderID: '1', status: PlotStatus.Available},
  {id: '4', sector: 'D', avenue: 'Avenue 4', number: 401, area: 550, leaseholderID: null, status: PlotStatus.Available},
  {
    id: '5',
    sector: 'E',
    avenue: 'Avenue 5',
    number: 501,
    area: 700,
    leaseholderID: '6',
    status: PlotStatus.Unavailable
  },
  {
    id: '6',
    sector: 'F',
    avenue: 'Avenue 6',
    number: 601,
    area: 600,
    leaseholderID: '3',
    status: PlotStatus.Unavailable
  },
  {id: '7', sector: 'G', avenue: 'Avenue 7', number: 701, area: 800, leaseholderID: '8', status: PlotStatus.Available},
  {
    id: '8',
    sector: 'H',
    avenue: 'Avenue 8',
    number: 801,
    area: 900,
    leaseholderID: '10',
    status: PlotStatus.Unavailable
  },
  {id: '9', sector: 'I', avenue: 'Avenue 9', number: 901, area: 450, leaseholderID: '11', status: PlotStatus.Available},
  {
    id: '10',
    sector: 'J',
    avenue: 'Avenue 10',
    number: 1001,
    area: 600,
    leaseholderID: '16',
    status: PlotStatus.Unavailable
  },
  {
    id: '11',
    sector: 'K',
    avenue: 'Avenue 11',
    number: 1101,
    area: 700,
    leaseholderID: '19',
    status: PlotStatus.Unavailable
  },
  {
    id: '12',
    sector: 'L',
    avenue: 'Avenue 12',
    number: 1201,
    area: 800,
    leaseholderID: null,
    status: PlotStatus.Available
  },
  {
    id: '13',
    sector: 'M',
    avenue: 'Avenue 13',
    number: 1301,
    area: 750,
    leaseholderID: '20',
    status: PlotStatus.Unavailable
  },
  {
    id: '14',
    sector: 'N',
    avenue: 'Avenue 14',
    number: 1401,
    area: 600,
    leaseholderID: '14',
    status: PlotStatus.Available
  },
  {
    id: '15',
    sector: 'O',
    avenue: 'Avenue 15',
    number: 1501,
    area: 850,
    leaseholderID: '17',
    status: PlotStatus.Unavailable
  },
  {
    id: '16',
    sector: 'P',
    avenue: 'Avenue 16',
    number: 1601,
    area: 700,
    leaseholderID: null,
    status: PlotStatus.Available
  },
  {
    id: '17',
    sector: 'Q',
    avenue: 'Avenue 17',
    number: 1701,
    area: 600,
    leaseholderID: '12',
    status: PlotStatus.Unavailable
  },
  {
    id: '18',
    sector: 'R',
    avenue: 'Avenue 18',
    number: 1801,
    area: 750,
    leaseholderID: null,
    status: PlotStatus.Available
  },
  {
    id: '19',
    sector: 'S',
    avenue: 'Avenue 19',
    number: 1901,
    area: 500,
    leaseholderID: '2',
    status: PlotStatus.Unavailable
  },
  {
    id: '20',
    sector: 'T',
    avenue: 'Avenue 20',
    number: 2001,
    area: 600,
    leaseholderID: '4',
    status: PlotStatus.Unavailable
  },
];
