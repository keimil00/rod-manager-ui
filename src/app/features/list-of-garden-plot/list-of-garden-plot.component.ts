import {Component, OnInit, ViewChild} from '@angular/core';
import {GardenPlot, GardenPlotBackend} from './garden-plot';
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";
import {gardenPlots} from "./GardenService";
import {profiles} from "../list-of-users/ProfilesService";
import {MatDialog} from "@angular/material/dialog";
import {GardenPlotDetailsComponent} from "./garden-plot-details/garden-plot-details.component";
import {GardenPlotAddLeaseholderComponent} from "./garden-plot-add-leaseholder/garden-plot-add-leaseholder.component";
import {GardenPlotListAddGardenComponent} from "./garden-plot-list-add-garden/garden-plot-list-add-garden.component";
import {MatPaginator} from "@angular/material/paginator";
import {BackendGardenService} from "./backend-garden.service";
import {Post} from "../home/post/post.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-of-garden-plot',
  templateUrl: './list-of-garden-plot.component.html',
  styleUrls: ['./list-of-garden-plot.component.scss']
})
export class ListOfGardenPlotComponent {
  displayedColumns: string[] = ['sector', 'avenue', 'number', 'area', 'leaseholder', 'add', 'status', 'info'];
  // dataSource: MatTableDataSource<GardenPlot>;
  //backend
  dataSource: MatTableDataSource<GardenPlotBackend>;

  showDetails: boolean = false;
  showAddingLeaseHolder: boolean = false;
  showAddingGardenPlot: boolean = false;

  //paginacja
  gardenLoaded: GardenPlotBackend[] = [];
  totalGardenCount: number;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private gardenPlotsDataService: BackendGardenService) {
    // this.dataSource = new MatTableDataSource(gardenPlots)
    this.sortData()

    //backend
    this.initData();
    this.dataSource = new MatTableDataSource(this.gardenLoaded);
    this.updateData()
    this.totalGardenCount = this.gardenPlotsDataService.getTotalGardenPlotsCount();
    this.dataSource.paginator = this.paginator;
  }


  //backendAPI
  // private initData() {
  //   this.gardenPlotsDataService.getPosts(0, this.pageSize).subscribe(
  //     (data: GardenPlotBackend[]) => {
  //       this.gardenLoaded = data;
  //       this.updateData();
  //     },
  //     (error) => {
  //       console.error('There was an error!', error);
  //     }
  //   );
  // }
  //
  // fetchData(pageIndex: number, pageSize: number): GardenPlotBackend[] {
  //   let data: GardenPlotBackend[] = [];
  //
  //   this.gardenPlotsDataService.getPosts(pageIndex, pageSize).subscribe(
  //     (responseData: GardenPlotBackend[]) => {
  //       data = responseData;
  //     },
  //     (error) => {
  //       console.error('There was an error!', error);
  //     }
  //   );
  //
  //   return data;
  // }

  private initData() {
    this.gardenLoaded = this.gardenPlotsDataService.getGardenPlots(0, this.pageSize);
  }

  fetchData(pageIndex: number, pageSize: number): any[] {
    return this.gardenPlotsDataService.getGardenPlots(pageIndex, pageSize);
  }

  onNewDataLoaded(data: any[]) {
    this.gardenLoaded = data;
    this.updateData()
  }

  // sortData() {
  //   gardenPlots.sort((a, b) => {
  //     // @ts-ignore
  //     const sectorComparison = a.sector.localeCompare(b.sector);
  //     if (sectorComparison !== 0) {
  //       return sectorComparison;
  //     }
  //
  //     // @ts-ignore
  //     const avenueComparison = a.avenue.localeCompare(b.avenue);
  //     if (avenueComparison !== 0) {
  //       return avenueComparison;
  //     }
  //     return a.number - b.number;
  //   });
  //   this.dataSource.data = gardenPlots;
  // }

  updateData() {//to backend
    this.gardenPlotsDataService.sortData()
    this.dataSource.data = this.gardenLoaded;
  }

  sortData() {
    this.gardenPlotsDataService.sortData()
  }

  getLeaseholderName(leaseholderID: string): any {
    const leaseholder = profiles.find(profile => profile.profileId === leaseholderID);
    if (leaseholder) {
      return `${leaseholder.firstName} ${leaseholder.lastName}`;
    }
    return null;
  }

  selectDetails(gardenPlot: GardenPlot) {
    // const leaseholder = this.findLeaseholderById(gardenPlot.leaseholderID) || undefined;
    const leaseholder = this.gardenPlotsDataService.getLeaseholder(gardenPlot.gardenPlotID,gardenPlots)
    this.showDetails = true;
    this.showDetailsDialog(gardenPlot, leaseholder)
  }

  //backendAPI
  // showDetailsDialog(gardenPlot: GardenPlot, leaseholder: Observable<Profile>) {
  //   const dialogRef = this.dialog.open(GardenPlotDetailsComponent, {
  //     width: '4000px',
  //     data: {gardenPlot, leaseholder},
  //   });
  //
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.closeDetails()
  //     // this.sortData()
  //     this.updateData()
  //   });
  // }
  showDetailsDialog(gardenPlot: GardenPlot, leaseholder: Profile | undefined) {
    const dialogRef = this.dialog.open(GardenPlotDetailsComponent, {
      width: '4000px',
      data: {gardenPlot, leaseholder},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeDetails()
      // this.sortData()
      this.updateData()
    });
  }

  selectAddingLeaseHolder(gardenPlot: GardenPlotBackend) {
    this.showAddingLeaseHolder = true;
    this.showAddingLeaseHolderDialog(gardenPlot)
  }

  showAddingLeaseHolderDialog(gardenPlot: GardenPlotBackend) {
    const dialogRef = this.dialog.open(GardenPlotAddLeaseholderComponent, {
      width: '4000px',
      data: {gardenPlot},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeAddingLeaseHolder()
      // this.sortData()
      this.updateData()
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
      // this.sortData()
      this.updateData()
    });
  }

  findLeaseholderById(id: string | null): Profile | null {
    return profiles.find(profile => profile.profileId === id) || null;
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

