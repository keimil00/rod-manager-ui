import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Profile} from "../../Profile";
import {GardenPlot} from "../garden-plot";
import {MatTableDataSource} from "@angular/material/table";
import {Payment, PaymentList} from "./PaymentList";


@Component({
  selector: 'app-garden-plot-details',
  templateUrl: './garden-plot-details.component.html',
  styleUrls: ['./garden-plot-details.component.scss']
})
export class GardenPlotDetailsComponent {
  @Input() gardenPlot: GardenPlot | undefined;
  @Input() leaseholder: Profile | undefined;
  @Output() closeDetails = new EventEmitter<void>();

  showPaymentHistory = false;

  constructor() {
    this.gardenPlot = undefined;
    this.leaseholder = undefined;
  }

paymentLists: PaymentList[] = [
  {
    id:'1',
    idUser: '1',
    userPaymentList: [
      { value: 325, date: new Date(2023, 10, 31) },
      { value: 230, date: new Date(2026, 10, 20) },
      { value: 280, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'2',
    idUser: '2',
    userPaymentList: [
      { value: 2340, date: new Date(2023, 10, 31) },
      { value: 2340, date: new Date(2023, 10, 31) },
      { value: 2450, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'3',
    idUser: '3',
    userPaymentList: [
      { value: 145, date: new Date(2023, 10, 31) },
      { value: 234, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'4',
    idUser: '4',
    userPaymentList: [
      { value: 145, date: new Date(2023, 10, 31) },
      { value: 145, date: new Date(2023, 10, 31) },
      { value: 432, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'5',
    idUser: '5',
    userPaymentList: [
      { value: 547, date: new Date(2023, 10, 31) },
      { value: 547, date: new Date(2023, 10, 31) },
      { value: 547, date: new Date(2023, 10, 31) },
      { value: 76, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'6',
    idUser: '6',
    userPaymentList: [
      { value: 863, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'7',
    idUser: '7',
    userPaymentList: [
      { value: 754, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'8',
    idUser: '8',
    userPaymentList: [
      { value: 435, date: new Date(2023, 10, 31) },
      { value: 434, date: new Date(2023, 10, 31) },
      { value: 34, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'9',
    idUser: '9',
    userPaymentList: [
      { value: 342, date: new Date(2023, 10, 31) },
      { value: 543, date: new Date(2026, 10, 31) },
      { value: 435, date: new Date(2023, 10, 31) },
      { value: 435, date: new Date(2028, 10, 31) },
      { value: 2435, date: new Date(2029, 10, 20) }
    ]
  },
  {
    id:'10',
    idUser: '10',
    userPaymentList: [
      { value: 2340, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'11',
    idUser: '11',
    userPaymentList: [
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'12',
    idUser: '12',
    userPaymentList: [
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'13',
    idUser: '13',
    userPaymentList: [
      { value: 45345, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'14',
    idUser: '14',
    userPaymentList: [
      { value: 55, date: new Date(2023, 10, 31) },
      { value: 656, date: new Date(2021, 5, 31) },
      { value: 565, date: new Date(2020, 10, 31) },
      { value: 5464, date: new Date(2023, 10, 31) },
      { value: 465, date: new Date(2021, 17, 31) },
      { value: 654, date: new Date(2023, 10, 31) },
      { value: 2546, date: new Date(2020, 3, 31) },
      { value: 546, date: new Date(2021, 6, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'15',
    idUser: '15',
    userPaymentList: [
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'16',
    idUser: '16',
    userPaymentList: [
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'17',
    idUser: '17',
    userPaymentList: [
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'18',
    idUser: '18',
    userPaymentList: [
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'19',
    idUser: '19',
    userPaymentList: [
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  },
  {
    id:'20',
    idUser: '20',
    userPaymentList: [
      { value: 200, date: new Date(2023, 10, 31) },
      { value: 200, date: new Date(2024, 10, 20) }
    ]
  }];

  getUserPaymentList(): Payment[] {
    const userPaymentList = this.paymentLists.find((user) => user.idUser === this.leaseholder?.id)?.userPaymentList || [];
    return userPaymentList;
  }
}
interface Property {
  label: string;
  value: any;
}

