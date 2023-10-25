import { Component } from '@angular/core';
import {GardenPlot, PlotStatus} from './garden-plot';
import {MatTableDataSource} from "@angular/material/table";
@Component({
  selector: 'app-list-of-garden-plot',
  templateUrl: './list-of-garden-plot.component.html',
  styleUrls: ['./list-of-garden-plot.component.scss']
})
export class ListOfGardenPlotComponent {
  displayedColumns: string[] = ['sector', 'avenue', 'number', 'area', 'leaseholder', 'add', 'status', 'info'];
  dataSource: MatTableDataSource<GardenPlot>;

  gardenPlots: GardenPlot[] = [
    { id: 1, sector: 'A', avenue: 'Avenue 1', number: 101, area: 500, leaseholder: null, status: PlotStatus.Available },
    { id: 2, sector: 'B', avenue: 'Avenue 2', number: 201, area: 600, leaseholder: null, status: PlotStatus.Available },
    { id: 3, sector: 'C', avenue: 'Avenue 3', number: 301, area: 750, leaseholder: 'Michael Brown',status: PlotStatus.Available},
    { id: 4, sector: 'D', avenue: 'Avenue 4', number: 401, area: 550, leaseholder: null, status: PlotStatus.Available },
    { id: 5, sector: 'E', avenue: 'Avenue 5', number: 501, area: 700, leaseholder: 'Robert Wilson', status: PlotStatus.Unavailable },
    { id: 6, sector: 'F', avenue: 'Avenue 6', number: 601, area: 600, leaseholder: 'Sarah Lee', status: PlotStatus.Unavailable },
    { id: 7, sector: 'G', avenue: 'Avenue 7', number: 701, area: 800, leaseholder: 'William Martinez', status: PlotStatus.Available },
    { id: 8, sector: 'H', avenue: 'Avenue 8', number: 801, area: 900, leaseholder: 'Karen Garcia', status: PlotStatus.Unavailable},
    { id: 9, sector: 'I', avenue: 'Avenue 9', number: 901, area: 450, leaseholder: 'Richard Johnson', status: PlotStatus.Available },
    { id: 10, sector: 'J', avenue: 'Avenue 10', number: 1001, area: 600, leaseholder: 'Susan Williams', status: PlotStatus.Unavailable },
    { id: 11, sector: 'K', avenue: 'Avenue 11', number: 1101, area: 700, leaseholder: 'David Moore', status: PlotStatus.Unavailable},
    { id: 12, sector: 'L', avenue: 'Avenue 12', number: 1201, area: 800, leaseholder: null, status: PlotStatus.Available },
    { id: 13, sector: 'M', avenue: 'Avenue 13', number: 1301, area: 750, leaseholder: 'Paul Clark', status: PlotStatus.Unavailable },
    { id: 14, sector: 'N', avenue: 'Avenue 14', number: 1401, area: 600, leaseholder: 'Carol Smith', status: PlotStatus.Available },
    { id: 15, sector: 'O', avenue: 'Avenue 15', number: 1501, area: 850, leaseholder: 'Mark Davis', status: PlotStatus.Unavailable },
    { id: 16, sector: 'P', avenue: 'Avenue 16', number: 1601, area: 700, leaseholder: null, status: PlotStatus.Available },
    { id: 17, sector: 'Q', avenue: 'Avenue 17', number: 1701, area: 600, leaseholder: 'Steven Taylor', status: PlotStatus.Unavailable },
    { id: 18, sector: 'R', avenue: 'Avenue 18', number: 1801, area: 750, leaseholder: null, status: PlotStatus.Available },
    { id: 19, sector: 'S', avenue: 'Avenue 19', number: 1901, area: 500, leaseholder: 'Thomas Martinez', status: PlotStatus.Unavailable },
    { id: 20, sector: 'T', avenue: 'Avenue 20', number: 2001, area: 600, leaseholder: 'Patricia Moore', status: PlotStatus.Unavailable },
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.gardenPlots);
  }
}
