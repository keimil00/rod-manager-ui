import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';

import {Profile} from "../../Profile";
import {GardenPlot, GardenPlotBackend} from "../garden-plot";
import {Payment, PaymentList} from "./PaymentList";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendGardenService} from "../backend-garden.service";


@Component({
  selector: 'app-garden-plot-details',
  templateUrl: './garden-plot-details.component.html',
  styleUrls: ['./garden-plot-details.component.scss']
})
export class GardenPlotDetailsComponent {
  gardenPlot: GardenPlotBackend | undefined;
  leaseholder: Profile | undefined;

  showPaymentHistory = false;
  showNewPaymentForm = false;
  showEditGardenPlotForm = false;

  paymentForm: FormGroup;

  errorMessages = {
    value: [
      {type: 'required', message: 'Proszę podać kwote'},
      {type: 'min', message: 'Kwota musi być większa od zera'},
      {type: 'pattern', message: 'Podaj odpowiednią kwote'}
    ],
    date: [
      {type: 'required', message: 'Proszę podać poprawną date'}
    ]
  };

  constructor(formBuilder: FormBuilder, private gardenPlotsDataService: BackendGardenService,
              public dialogRef: MatDialogRef<GardenPlotDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { gardenPlot: GardenPlotBackend; leaseholder: Profile }
  ) {
    this.gardenPlot = data.gardenPlot;
    this.leaseholder = data.leaseholder;
    this.paymentForm = formBuilder.group({
      value: ['', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?/),
        Validators.min(0.01)
      ]],
      date: ['', [
        Validators.required,
      ]]
    });
  }

  closeEditingingGardenPlot() {
    this.dialogRef.close();
  }

  getUserPaymentList(): Payment[] {
    // this.gardenPlotsDataService.getPayments(this.leaseholder?.id)
    const userPaymentList = this.paymentLists.find((user) => user.idUser === this.leaseholder?.id)?.userPaymentList || [];
    return userPaymentList;
  }

  addNewPayment() {
    if (this.paymentForm.valid) {
      const newPaymentAmount: number = this.paymentForm.get('value')?.value;
      const newPaymentDate: Date = this.paymentForm.get('date')?.value;

      if (newPaymentAmount !== null && newPaymentDate !== null) {
        const newPayment: Payment = {
          value: newPaymentAmount,
          date: newPaymentDate,
        };

        //TODO push do backendu dodac do listy i obnizyc kwote do zaplaty
        // this.addPaymentBackend(this.leaseholder?.id, newPayment)
        //TODO do usuniecia jak bedzie backend
        this.getUserPaymentList().push(newPayment);
        this.showNewPaymentForm = false;
        this.paymentForm.reset();
      }
    }
  }

  addPaymentBackend(leaseholderID: string | undefined, payment: Payment) {
    this.gardenPlotsDataService.addPayment(leaseholderID, payment).subscribe(
      (response) => {
        console.log('Payment added successfully:', response);
      },
      (error) => {
        console.error('Error while adding payment:', error);
      }
    );
  }

  validationErrors(controlName: string): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (this.paymentForm.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  paymentLists: PaymentList[] = [
    {
      id: '1',
      idUser: '1',
      userPaymentList: [
        {value: 325, date: new Date(2023, 10, 31)},
        {value: 230, date: new Date(2026, 10, 20)},
        {value: 280, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '2',
      idUser: '2',
      userPaymentList: [
        {value: 2340, date: new Date(2023, 10, 31)},
        {value: 2340, date: new Date(2023, 10, 31)},
        {value: 2450, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '3',
      idUser: '3',
      userPaymentList: [
        {value: 145, date: new Date(2023, 10, 31)},
        {value: 234, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '4',
      idUser: '4',
      userPaymentList: [
        {value: 145, date: new Date(2023, 10, 31)},
        {value: 145, date: new Date(2023, 10, 31)},
        {value: 432, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '5',
      idUser: '5',
      userPaymentList: [
        {value: 547, date: new Date(2023, 10, 31)},
        {value: 547, date: new Date(2023, 10, 31)},
        {value: 547, date: new Date(2023, 10, 31)},
        {value: 76, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '6',
      idUser: '6',
      userPaymentList: [
        {value: 863, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '7',
      idUser: '7',
      userPaymentList: [
        {value: 754, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '8',
      idUser: '8',
      userPaymentList: [
        {value: 435, date: new Date(2023, 10, 31)},
        {value: 434, date: new Date(2023, 10, 31)},
        {value: 34, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '9',
      idUser: '9',
      userPaymentList: [
        {value: 342, date: new Date(2023, 10, 31)},
        {value: 543, date: new Date(2026, 10, 31)},
        {value: 435, date: new Date(2023, 10, 31)},
        {value: 435, date: new Date(2028, 10, 31)},
        {value: 2435, date: new Date(2029, 10, 20)}
      ]
    },
    {
      id: '10',
      idUser: '10',
      userPaymentList: [
        {value: 2340, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '11',
      idUser: '11',
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '12',
      idUser: '12',
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '13',
      idUser: '13',
      userPaymentList: [
        {value: 45345, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '14',
      idUser: '14',
      userPaymentList: [
        {value: 55, date: new Date(2023, 10, 31)},
        {value: 656, date: new Date(2021, 5, 31)},
        {value: 565, date: new Date(2020, 10, 31)},
        {value: 5464, date: new Date(2023, 10, 31)},
        {value: 465, date: new Date(2021, 17, 31)},
        {value: 654, date: new Date(2023, 10, 31)},
        {value: 2546, date: new Date(2020, 3, 31)},
        {value: 546, date: new Date(2021, 6, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '15',
      idUser: '15',
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '16',
      idUser: '16',
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '17',
      idUser: '17',
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '18',
      idUser: '18',
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '19',
      idUser: '19',
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: '20',
      idUser: '20',
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    }];
}
