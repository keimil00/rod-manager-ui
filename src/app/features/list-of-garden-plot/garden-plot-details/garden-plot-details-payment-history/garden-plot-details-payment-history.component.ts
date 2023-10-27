import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Payment} from "../PaymentList";

@Component({
  selector: 'app-garden-plot-details-payment-history',
  templateUrl: './garden-plot-details-payment-history.component.html',
  styleUrls: ['./garden-plot-details-payment-history.component.scss']
})
export class GardenPlotDetailsPaymentHistoryComponent implements OnInit, AfterViewInit {
  @Input() userPaymentList!: Payment[];

  displayedColumns: string[] = ['kwota', 'data'];
  dataSource: MatTableDataSource<Payment>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Payment>(this.userPaymentList);
    // this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Payment>(this.userPaymentList);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'kwota':
          return item.value;
        case 'data':
          return item.date;
        default:
          return item[property];
      }
    };
  }
}
