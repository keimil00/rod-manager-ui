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
  displayedColumns: string[] = ['addressC', 'id', 'measurement', 'add'];
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

  }

  ngOnInit(): void {
    this.spinner.show()
    this.initData()
  }

  private initData() {
    this.loadCounters(this.currentPageIndex, this.defoultpageSize)
  }

  loadCounters(index: number, size: number): void {
    forkJoin({
      electric: this.countersService.getElectricCounters(this.currentPageIndex, this.defoultpageSize),
      water: this.countersService.getWaterCounters(this.currentPageIndex, this.defoultpageSize),
      all: this.countersService.getAllCounters()
    }).subscribe({
      next: data => {

        this.dataSourceWater = new MatTableDataSource(data.water.results);

        this.dataSourceElectric = new MatTableDataSource(data.electric.results);

        this.totalWaterCount = data.water.count;
        this.totalElectricCount = data.electric.count;

        this.counters = data.all;

        this.dataSourceElectric.paginator = this.paginatorElectric;
        this.dataSourceWater.paginator = this.paginatorWater;

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

    this.countersService.getElectricCounters(this.currentPageIndex, this.currentPageSize).subscribe(
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
    this.countersService.getWaterCounters(this.currentPageIndex, this.currentPageSize).subscribe(
      data => {
        this.totalWaterCount = data.count;
        this.dataSourceWater.data = data.results;
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

        this.countersService.updateMeasurement(counter.id, result).subscribe({
          next: () => {
            this.updateData(counter.type === CounterType.Water)
          },
          error: error => {
            console.error(error)
            this.toastr.error('Ups, coś poszło nie tak', 'Błąd')
          }
        })
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
            next: () => {
              this.updateData(result.type === CounterType.Water)
            },
            error: error => {
              console.error(error)
              this.toastr.error('Ups, coś poszło nie tak', 'Błąd')
            }
          })
        }
      }
    );
  }
}




