import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {GardenPlot, GardenPlotWithLeaseholder} from './garden-plot';
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";
import {MatDialog} from "@angular/material/dialog";
import {GardenPlotDetailsComponent} from "./garden-plot-details/garden-plot-details.component";
import {GardenPlotAddLeaseholderComponent} from "./garden-plot-add-leaseholder/garden-plot-add-leaseholder.component";
import {GardenPlotListAddGardenComponent} from "./garden-plot-list-add-garden/garden-plot-list-add-garden.component";
import {MatPaginator} from "@angular/material/paginator";
import {BackendGardenService} from "./backend-garden.service";
import {Page} from "../../shared/paginator/page.model";
import {forkJoin} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {findExLeaseholderByPLotID, findLeaseholderByPLotID} from "./GardenService";
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {ToastrService} from "ngx-toastr";
import {legacySetLines} from "@angular/material/legacy-core";

@Component({
  selector: 'app-list-of-garden-plot',
  templateUrl: './list-of-garden-plot.component.html',
  styleUrls: ['./list-of-garden-plot.component.scss']
})
export class ListOfGardenPlotComponent {
  displayedColumns: string[] = ['sector', 'avenue', 'number', 'area', 'leaseholder', 'add', 'status', 'info'];

  dataSource = new MatTableDataSource<GardenPlotWithLeaseholder>();

  showDetails: boolean = false;
  showAddingLeaseHolder: boolean = false;
  showAddingGardenPlot: boolean = false;

  totalGardenCount: number = 0;
  defoultpageSize = 10;
  currentPageIndex = 1;
  currentPageSize = this.defoultpageSize;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private gardenPlotsDataService: BackendGardenService,
    private profilesService: ListOfUsersService,
    private changeDetectorRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
    this.spinner.show()
    this.sortData()

    this.initData();
    this.dataSource.paginator = this.paginator;
  }

  private initData() {
    this.loadProfiles(this.currentPageIndex, this.defoultpageSize)
  }

  loadProfiles(index: number, size: number): void {
    this.gardenPlotsDataService.getGardenPlots(this.currentPageIndex, size).subscribe({
      next: (page: Page<GardenPlotWithLeaseholder>) => {
        this.totalGardenCount = page.count;
        this.dataSource = new MatTableDataSource<GardenPlotWithLeaseholder>(page.results);
        this.spinner.hide()
      }, error: err => {
        this.spinner.hide()
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      }
    });
  }

  fetchData(pageIndex: number, pageSize: number): void {
    this.currentPageIndex = pageIndex;
    this.currentPageSize = pageSize;

    this.gardenPlotsDataService.getGardenPlots(pageIndex, pageSize).subscribe(
      data => {
        this.totalGardenCount = data.count;
        this.dataSource = new MatTableDataSource<GardenPlotWithLeaseholder>(data.results);
      },
      error => {
        console.error(error);
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      },
      () => {
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  updateData() {//to backend
    // this.gardenPlotsDataService.sortData()
    this.gardenPlotsDataService.getGardenPlots(this.currentPageIndex, this.currentPageSize).subscribe(
      data => {
        this.totalGardenCount = data.count;
        this.dataSource = new MatTableDataSource<GardenPlotWithLeaseholder>(data.results);
      },
      error => {
        console.error(error);
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      },
      () => {
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  sortData() {
    // this.gardenPlotsDataService.sortData()
  }

  selectDetails(gardenPlot: GardenPlot) {
    forkJoin({
      profiles: this.profilesService.getAllProfiles(),
      gardens: this.gardenPlotsDataService.getAllGardenPlots()
    }).subscribe({
      next: data => {
        let leaseHolder = findLeaseholderByPLotID(gardenPlot, data.profiles, data.gardens)
        console.log(JSON.stringify(leaseHolder));
        let exLeaseHolder = findExLeaseholderByPLotID(gardenPlot, data.profiles, data.gardens)
        this.showDetails = true;

        this.showDetailsDialog(gardenPlot, leaseHolder, exLeaseHolder);
      }, error: err => {
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      }
    });
  }

  showDetailsDialog(gardenPlot: GardenPlot, leaseholder: Profile | null, exLeaseHolder: Profile | null) {
    const dialogRef = this.dialog.open(GardenPlotDetailsComponent, {
      width: '4000px',
      data: {gardenPlot, leaseholder, exLeaseHolder},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeDetails()
      this.updateData()
    });
  }

  selectAddingLeaseHolder(gardenPlot: GardenPlotWithLeaseholder) {
    this.showAddingLeaseHolder = true;
    this.showAddingLeaseHolderDialog(gardenPlot)
  }

  showAddingLeaseHolderDialog(gardenPlot: GardenPlotWithLeaseholder) {
    const dialogRef = this.dialog.open(GardenPlotAddLeaseholderComponent, {
      width: '4000px',
      data: {gardenPlot},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeAddingLeaseHolder()
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
      this.updateData()
    });
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

