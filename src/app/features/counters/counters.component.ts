import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Counter, CounterType} from "./counter";
import {MeasurementDialogComponent} from "./measurement-dialog/measurement-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddCounterDialogComponent} from "./add-counter-dialog/add-counter-dialog.component";
import {CountersService} from "./counters.service";
import {NgxSpinnerService} from "ngx-spinner";
import {forkJoin} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss']
})
export class CountersComponent {
  displayedColumns: string[] = ['addressC', 'name', 'gardenPlotID', 'measurement', 'add'];
  showWater: boolean = true;

  totalElectricCount: number = 0;
  totalWaterCount: number = 0;
  defoultpageSize = 10;
  currentPageIndex = 1;
  currentPageSize = this.defoultpageSize;

  // @ts-ignore
  dataSourceElectric: MatTableDataSource<Counter>
  // @ts-ignore
  dataSourceWater: MatTableDataSource<Counter>
  // @ts-ignore
  counters: Counter[]

  @ViewChild(MatPaginator) paginatorWater!: MatPaginator;
  @ViewChild(MatPaginator) paginatorElectric!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private countersService: CountersService,
    private spinner: NgxSpinnerService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.spinner.show()
    // this.setData()
    this.initData2()
    // @ts-ignore
    this.dataSourceElectric.paginator = this.paginatorElectric;
    // @ts-ignore
    this.dataSourceWater.paginator = this.paginatorWater;
  }

  private initData2() {
    this.loadCounters(this.currentPageIndex, this.defoultpageSize)
  }

  loadCounters(index: number, size: number): void {
    forkJoin({
      electric: this.countersService.getElectricCounters(this.currentPageIndex, this.defoultpageSize),
      water: this.countersService.getWaterCounters(this.currentPageIndex, this.defoultpageSize),
      all: this.countersService.getAllCounters()
    }).subscribe({
      next: data => {
        // @ts-ignore
        const dataSourceWater: MatTableDataSource<Counter> = new MatTableDataSource([]);
        // @ts-ignore
        const dataSourceElectric: MatTableDataSource<Counter> = new MatTableDataSource([]);

        dataSourceWater.data = data.water.results;
        dataSourceElectric.data = data.electric.results;

        this.totalWaterCount = data.water.count;
        this.totalElectricCount = data.electric.count;
        this.counters = data.all;

        this.dataSourceWater = dataSourceWater;
        this.dataSourceElectric = dataSourceElectric;
        this.spinner.hide()
      }, error: error => {
        console.error(error);
        this.spinner.hide()
        this.toastr.error('Ups, coś poszło nie tak', 'Błąd')
      }
    });
  }

  fetchDataElectric(pageIndex: number, pageSize: number): void {
    this.currentPageIndex = pageIndex;
    this.currentPageSize = pageSize;
    this.spinner.show()

    this.countersService.getElectricCounters(this.currentPageIndex, this.defoultpageSize).subscribe(
      data => {
        this.totalElectricCount = data.count;
        this.dataSourceElectric = new MatTableDataSource<Counter>(data.results);
      },
      error => {
        console.error(error);
        this.spinner.hide()
        this.toastr.error('Ups, coś poszło nie tak', 'Błąd')
      },
      () => {
        this.changeDetectorRef.detectChanges();
        this.spinner.hide()
      }
    );
  }

  fetchDataWater(pageIndex: number, pageSize: number): void {
    this.currentPageIndex = pageIndex;
    this.currentPageSize = pageSize;

    this.spinner.show()
    this.countersService.getWaterCounters(this.currentPageIndex, this.defoultpageSize).subscribe(
      data => {
        this.totalWaterCount = data.count;
        this.dataSourceWater = new MatTableDataSource<Counter>(data.results);
      },
      error => {
        console.error(error);
        this.spinner.hide()
        this.toastr.error('Ups, coś poszło nie tak', 'Błąd')
      },
      () => {
        this.changeDetectorRef.detectChanges();
        this.spinner.hide()
      }
    );
  }


  updateData(isWater: boolean) {//to backend
    // this.gardenPlotsDataService.sortData()
    this.spinner.show()

    if (isWater) {
      forkJoin({
        water: this.countersService.getWaterCounters(this.currentPageIndex, this.currentPageSize),
        all: this.countersService.getAllCounters()
      }).subscribe(
        data => {
          this.totalWaterCount = data.water.count;
          this.dataSourceWater = new MatTableDataSource<Counter>(data.water.results);
          this.counters = data.all;
        },
        error => {
          console.error(error);
          this.spinner.hide()
          this.toastr.error('Ups, coś poszło nie tak', 'Błąd')
        },
        () => {
          this.changeDetectorRef.detectChanges();
          this.spinner.hide()
        }
      );
    } else {
      forkJoin({
        electric: this.countersService.getElectricCounters(this.currentPageIndex, this.currentPageSize),
        all: this.countersService.getAllCounters()
      }).subscribe(
        data => {
          this.totalElectricCount = data.electric.count;
          this.dataSourceElectric = new MatTableDataSource<Counter>(data.electric.results);
          this.counters = data.all;
        },
        error => {
          console.error(error);
          this.spinner.hide()
          this.toastr.error('Ups, coś poszło nie tak', 'Błąd')
        },
        () => {
          this.changeDetectorRef.detectChanges();
          this.spinner.hide()
        }
      );
    }
  }


  sortCounters() {
    this.counters.sort((a, b) => {
      if (a.gardenPlotID === null && b.gardenPlotID !== null) {
        return -1;
      }
      if (a.gardenPlotID !== null && b.gardenPlotID === null) {
        return 1;
      }

      if (a.gardenPlotID !== null && b.gardenPlotID !== null) {
        // @ts-ignore
        const aParts = a.addressC.split(', ');
        // @ts-ignore
        const bParts = b.addressC.split(', ');

        for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
          const comparison = aParts[i].localeCompare(bParts[i]);
          if (comparison !== 0) {
            return comparison;
          }
        }
        return 0;
      } else {
        // @ts-ignore
        return a.addressC.localeCompare(b.addressC);
      }
    });
  }

  changeWater() {
    this.showWater = !this.showWater
    this.currentPageIndex = 1;
    if (this.showWater) {
      this.fetchDataWater(this.currentPageIndex, this.currentPageSize)
    } else {
      this.fetchDataElectric(this.currentPageIndex, this.currentPageSize)
    }
  }

  openMeasurementDialog(counter: Counter) {
    const dialogRef = this.dialog.open(MeasurementDialogComponent, {
      width: '400px',
      data: {measurement: counter.measurement}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        //TODO zmienić stan konta użytkownika
        this.countersService.updateMeasurement(counter.id, result, counter.type).subscribe({
          error: error => {
            console.error(error)
            this.toastr.error('Ups, coś poszło nie tak', 'Błąd')
          }
        })
        this.updateData(result.type === CounterType.Water)
      }
    });
  }

  openAddCounterDialog() {
    const dialogRef = this.dialog.open(AddCounterDialogComponent, {
      width: '400px',
      data: {counters: this.counters, isShowWater: this.showWater}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.countersService.addCounter(result).subscribe({
            error: error => {
              console.error(error)
              this.toastr.error('Ups, coś poszło nie tak', 'Błąd')
            }
          })
          this.updateData(result.type === CounterType.Water)
        }
      }
    );
  }
}




