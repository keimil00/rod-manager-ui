import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Payment, UserPayment} from "../PaymentList";
import {PaymentsService} from "../../../payments/payments.service";
import {Page} from "../../../../shared/paginator/page.model";

@Component({
  selector: 'app-garden-plot-details-payment-history',
  templateUrl: './garden-plot-details-payment-history.component.html',
  styleUrls: ['./garden-plot-details-payment-history.component.scss']
})
export class GardenPlotDetailsPaymentHistoryComponent implements OnInit {
  @Input() userId!: number;

  displayedColumns: string[] = ['kwota', 'typ', 'data', 'opis'];
  dataSource: MatTableDataSource<UserPayment>;
  totalItemsCount: number = 0;
  pageSize: number = 10;
  pageIndex: number = 1;


  constructor(private paymentsService: PaymentsService) {
    this.dataSource = new MatTableDataSource();
  }



  loadData(index: number, size: number) {
    this.pageIndex = index;
    this.pageSize = size;
    this.paymentsService.getConfirmPayments(this.userId, index, size).subscribe({
      next: (payments: Page<UserPayment>) => {
        this.dataSource = new MatTableDataSource<UserPayment>(payments.results);
        this.totalItemsCount = payments.count;
      }
    });
  }

  refresh() {
    this.loadData(this.pageIndex, this.pageSize);
  }

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }
}
