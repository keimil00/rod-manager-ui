import {Injectable} from '@angular/core';
import {Fee, IndividualPayment, IndividualPayments, Payments, TypeOfFee} from "./payments";
import {HttpClient} from "@angular/common/http";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {EditingLeaseFeeComponent} from "./editing-lease-fee/editing-lease-fee.component";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private leaseFees: Fee[] = [
    {
      feeID: '1',
      name: 'PZD',
      type: TypeOfFee.PerMeter,
      value: 0.12,
    },
    {
      feeID: '2',
      name: 'Opłata ogrodowa',
      type: TypeOfFee.PerMeter,
      value: 0.61,
    },
    {
      feeID: '3',
      name: 'Opłata Inwestycyjna',
      type: TypeOfFee.PerMeter,
      value: 0.5,
    }
  ];
  private utilityFees: Fee[] = [
    {
      feeID: '2',
      name: 'Prąd',
      type: TypeOfFee.PerMeter,
      value: 0.12,
    },
    {
      feeID: '2',
      name: 'Woda',
      type: TypeOfFee.PerMeter,
      value: 0.61,
    },
  ];
  private additionalFees: Fee[] = [
    {
      feeID: '1',
      name: 'Koszenie trawy',
      type: TypeOfFee.PerGardenPlot,
      value: 70,
    },
    {
      feeID: '2',
      name: 'Grabienie liści',
      type: TypeOfFee.PerGardenPlot,
      value: 40,
    },
  ];

  private payments: Payments = {
    leaseFees: this.leaseFees,
    utilityFees: this.utilityFees,
    additionalFees: this.additionalFees,
    date: new Date(2024, 10, 30)
  }

  private individualPayments: IndividualPayments[] = [
    {
      userID: '1',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za przekroczenie limitu wody',
          value: 40,
          date: new Date(2023, 9, 15),
        },
        {
          paymentID: '2',
          name: 'Opłata za opiekę nad roślinami w czasie urlopu',
          value: 100,
          date: new Date(2023, 9, 18),
        },
      ],
    },
    {
      userID: '2',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z narzędzi ogrodowych',
          value: 80,
          date: new Date(2023, 9, 12),
        },
        {
          paymentID: '2',
          name: 'Opłata za dodatkową przestrzeń na składowanie narzędzi',
          value: 60,
          date: new Date(2023, 9, 19),
        },
      ],
    },
    {
      userID: '3',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z altany',
          value: 30,
          date: new Date(2023, 9, 22),
        },
        {
          paymentID: '2',
          name: 'Opłata za wynajem sprzętu ogrodniczego',
          value: 50,
          date: new Date(2023, 9, 25),
        },
      ],
    },
    {
      userID: '4',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za parking samochodu na terenie działki',
          value: 70,
          date: new Date(2023, 9, 5),
        },
        {
          paymentID: '2',
          name: 'Opłata za używanie ogrodowych mebli',
          value: 40,
          date: new Date(2023, 9, 10),
        },
      ],
    },
    {
      userID: '5',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za zwiększenie powierzchni ogródka',
          value: 90,
          date: new Date(2023, 9, 15),
        },
        {
          paymentID: '2',
          name: 'Opłata za dodatkową przestrzeń na przechowywanie narzędzi',
          value: 55,
          date: new Date(2023, 9, 20),
        },
      ],
    },
    {
      userID: '6',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za wykorzystanie miejsca na kompostowniku',
          value: 30,
          date: new Date(2023, 9, 25),
        },
        {
          paymentID: '2',
          name: 'Opłata za korzystanie z grilla ogrodowego',
          value: 25,
          date: new Date(2023, 9, 28),
        },
      ],
    },
    {
      userID: '7',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za sadzenie drzewka na działce',
          value: 50,
          date: new Date(2023, 9, 2),
        },
        {
          paymentID: '2',
          name: 'Opłata za wykorzystanie miejsca na składowanie kompostu',
          value: 35,
          date: new Date(2023, 9, 9),
        },
      ],
    },
    {
      userID: '8',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z altany ogrodowej',
          value: 65,
          date: new Date(2023, 9, 17),
        },
        {
          paymentID: '2',
          name: 'Opłata za ochronę środowiska naturalnego',
          value: 80,
          date: new Date(2023, 9, 21),
        },
      ],
    },
    {
      userID: '9',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z warzywnika',
          value: 45,
          date: new Date(2023, 9, 24),
        },
        {
          paymentID: '2',
          name: 'Opłata za wykorzystanie miejsca na suszenie ziół',
          value: 30,
          date: new Date(2023, 9, 27),
        },
      ],
    },
    {
      userID: '10',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z mini stawu',
          value: 55,
          date: new Date(2023, 9, 3),
        },
        {
          paymentID: '2',
          name: 'Opłata za uprawę kwiatów',
          value: 40,
          date: new Date(2023, 9, 12),
        },
      ],
    },
    {
      userID: '11',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za wykorzystanie pomostu ogrodowego',
          value: 60,
          date: new Date(2023, 9, 18),
        },
        {
          paymentID: '2',
          name: 'Opłata za korzystanie z mini placu zabaw dla dzieci',
          value: 70,
          date: new Date(2023, 9, 25),
        },
      ],
    },
    {
      userID: '12',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z miejsca na ognisko',
          value: 45,
          date: new Date(2023, 9, 9),
        },
        {
          paymentID: '2',
          name: 'Opłata za utrzymanie alejek ogrodowych',
          value: 35,
          date: new Date(2023, 9, 21),
        },
      ],
    },

    {
      userID: '13',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z miejsca na grillowanie',
          value: 50,
          date: new Date(2023, 9, 5),
        },
        {
          paymentID: '2',
          name: 'Opłata za wykorzystanie altanki do spotkań',
          value: 70,
          date: new Date(2023, 9, 15),
        },
      ],
    },
    {
      userID: '14',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za udział w pracach porządkowych',
          value: 40,
          date: new Date(2023, 9, 8),
        },
        {
          paymentID: '2',
          name: 'Opłata za wspólne sadzenie kwiatów',
          value: 60,
          date: new Date(2023, 9, 20),
        },
      ],
    },
    {
      userID: '15',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z altany do czytania',
          value: 35,
          date: new Date(2023, 9, 12),
        },
        {
          paymentID: '2',
          name: 'Opłata za prace konserwatorskie na działce',
          value: 80,
          date: new Date(2023, 9, 28),
        },
      ],
    },
    {
      userID: '16',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z miejsc do piknikowania',
          value: 60,
          date: new Date(2023, 9, 3),
        },
        {
          paymentID: '2',
          name: 'Opłata za kurs ogrodnictwa',
          value: 90,
          date: new Date(2023, 9, 18),
        },
      ],
    },
    {
      userID: '17',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za organizację wydarzenia na terenie działki',
          value: 100,
          date: new Date(2023, 9, 10),
        },
        {
          paymentID: '2',
          name: 'Opłata za korzystanie z mini boiska sportowego',
          value: 75,
          date: new Date(2023, 9, 23),
        },
      ],
    },
    {
      userID: '18',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z ogrodowych narzędzi rekreacyjnych',
          value: 55,
          date: new Date(2023, 9, 5),
        },
        {
          paymentID: '2',
          name: 'Opłata za zajęcia z ekologii na terenie działki',
          value: 40,
          date: new Date(2023, 9, 16),
        },
      ],
    },
    {
      userID: '19',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za korzystanie z miejsca na relaks',
          value: 45,
          date: new Date(2023, 9, 8),
        },
        {
          paymentID: '2',
          name: 'Opłata za kurs kulinarny na terenie ogrodu',
          value: 85,
          date: new Date(2023, 9, 20),
        },
      ],
    },
    {
      userID: '20',
      paymentsList: [
        {
          paymentID: '1',
          name: 'Opłata za utrzymanie stawu na terenie działki',
          value: 70,
          date: new Date(2023, 9, 13),
        },
        {
          paymentID: '2',
          name: 'Opłata za zajęcia z malarstwa w plenerze',
          value: 55,
          date: new Date(2023, 9, 25),
        },
      ],
    },
  ];

  private readonly individualPaymentsUrl = 'https://localhost:1337/api/individualPayments';
  private readonly paymentsUrl = 'https://localhost:1337/api/payments';
  private readonly confirmPaymentsURL = 'https://localhost:1337/api/confirm-payments'

  constructor(private httpClient: HttpClient) {
  }

  getPayments(): Observable<Payments> {
    return of (this.payments)
  }

  // TODO Backend
  getPayments2(): Observable<Payments> {
    return this.httpClient.get<Payments>(this.paymentsUrl);
  }

  //   TODO pamietac ze przy rejestracji trzeba dodawac to do listy
  findUserPaymentsByAddress(sector: string | null, avenue: string | null, number: number | null, gardenPlots: GardenPlot[]): Observable<IndividualPayments | null> {
    const matchingGardenPlot = gardenPlots.find((gardenPlot) =>
      gardenPlot.sector === sector && gardenPlot.avenue === avenue && gardenPlot.number === number
    );
    const leaseholderID = matchingGardenPlot ? matchingGardenPlot.leaseholderID : null;
    const individualPayment = this.individualPayments.find((payment) => payment.userID === leaseholderID)
    if (individualPayment) {
      return of( individualPayment)
    } else return of( null)
  }

  //   TODO
  findUserPaymentsByAddress2(sector: string | null, avenue: string | null, number: number | null): Observable<IndividualPayments | null> {
    const url = `${this.individualPaymentsUrl}?sector=${sector}&avenue=${avenue}&number=${number}`;
    return this.httpClient.get<IndividualPayments | null>(url);
  }

  addNewIndividualPayment(userId: string | undefined, individualPayment: IndividualPayment): Observable<any> {
    const foundUserIndex = this.individualPayments.findIndex(payment => payment.userID === userId);
    if (foundUserIndex !== -1) {
      // @ts-ignore
      this.individualPayments[foundUserIndex].paymentsList.push(individualPayment);
    }
    return of(null);
  }

  //   TODO
  addNewIndividualPayment2(userId: string | undefined, individualPayment: IndividualPayment): Observable<any> {
    const url = `${this.individualPaymentsUrl}/${userId}/addPayment`;
    return this.httpClient.post(url, individualPayment);
  }

  deleteIndividualPayment(userID: string, paymentID: string): Observable<any> {
    const foundUserIndex = this.individualPayments.findIndex(payments => payments.userID === userID);
    if (foundUserIndex !== -1) {
      // @ts-ignore
      const foundPaymentIndex = this.individualPayments[foundUserIndex].paymentsList.findIndex(payment => payment.paymentID === paymentID);
      if (foundPaymentIndex !== -1) {
        // @ts-ignore
        this.individualPayments[foundUserIndex].paymentsList.splice(foundPaymentIndex, 1);
      }
    }
    return of(null);
  }

  //   TODO
  deleteIndividualPayment2(userID: string, paymentID: string): Observable<any> {
    const url = `${this.individualPaymentsUrl}/${userID}/deletePayment/${paymentID}`;
    return this.httpClient.delete(url);
  }

  editLeaseFee(payments: Fee[]): Observable<any> {
    this.payments.leaseFees = payments;
    return of(null);
  }
  //   TODO
  editLeaseFee2(payments: Fee[]): Observable<any> {
    return this.httpClient.put(this.paymentsUrl + '/leaseFees', payments);
  }

  editUtilityFee(payments: Fee[]): Observable<any> {
    this.payments.utilityFees = payments;
    return of(null);
  }
  //   TODO
  editUtilityFee2(payments: Fee[]): Observable<any> {
    return this.httpClient.put(this.paymentsUrl + '/utilityFees', payments);
  }

  editAdditionalFee(payment: Fee | undefined): Observable<any> {
    // @ts-ignore
    const foundIndex = this.payments.additionalFees.findIndex(curentPayment => curentPayment.feeID === payment.feeID);
    if (foundIndex !== -1) {
      if (payment) {
        this.payments.additionalFees[foundIndex] = payment;
      }
    }
    return of(null);
  }
  //   TODO
  editAdditionalFee2(payment: Fee | undefined): Observable<any> {
    const url = `${this.paymentsUrl}/additionalFees/${payment?.feeID}`;
    return this.httpClient.put(url, payment);
  }

  addAdditionalFee(payment: Fee): Observable<any> {
    this.payments.additionalFees.push(payment)
    return of(null);
  }

  //   TODO
  addAdditionalFee2(payment: Fee): Observable<any> {
    return this.httpClient.post(this.paymentsUrl + '/additionalFees', payment);
  }

  updateDate(date: Date): Observable<any> {
    this.payments.date = date
    return of(null);
  }

  updateDate2(date: Date): Observable<any> {
    return this.httpClient.put(this.paymentsUrl + '/date', { date });
  }

  confirmALLPayments():Observable<any> {
    return this.httpClient.post<any>(this.confirmPaymentsURL,{});
  }

}

// przerwa
// przerwa
// przerwa
// przerwa
// przerwa
// przerwa
// przerwa
// przerwa
// przerwa
// przerwa
// przerwa
// przerwa


// ### GET
//   GET https://localhost:1337/api/payments
//     Accept: application/json
//
//   Response example:
// {
//   "leaseFees": [
//   {
//     "feeID": "1",
//     "name": "PZD",
//     "type": "PerMeter",
//     "value": 0.12
//   },
//   {
//     "feeID": "2",
//     "name": "Opłata ogrodowa",
//     "type": "PerMeter",
//     "value": 0.61
//   },
//   {
//     "feeID": "3",
//     "name": "Opłata Inwestycyjna",
//     "type": "PerMeter",
//     "value": 0.5
//   }
// ],
//   "utilityFees": [
//   {
//     "feeID": "1",
//     "name": "Prąd",
//     "type": "PerMeter",
//     "value": 0.12
//   },
//   {
//     "feeID": "2",
//     "name": "Woda",
//     "type": "PerMeter",
//     "value": 0.61
//   }
// ],
//   "additionalFees": [
//   {
//     "feeID": "1",
//     "name": "Koszenie trawy",
//     "type": "PerGardenPlot",
//     "value": 70
//   },
//   {
//     "feeID": "2",
//     "name": "Grabienie liści",
//     "type": "PerGardenPlot",
//     "value": 40
//   }
// ],
//   "date": "2023-11-30T00:00:00.000Z"
// }
// interface Fee {
//   feeID: string,,
//   name: string;
//   type: TypeOfFee;
//   value: number;
// }
//
// interface Payments {
//   leaseFees: Fee[];
//   utilityFees: Fee[];
//   additionalFees: Fee[];
//   date: Date;
// }
//
// enum TypeOfFee {
//   PerMeter = 'PerMeter',
//   PerGardenPlot = 'PerGardenPlot',
// }
//
// type PaymentsResponse = Payments;
// /
// /
// /
// /
// /
// /
// /
// /
// /
// ### GET request to find User Payments by Address
//
// Retrieves individual payments based on the provided address parameters.
//
// #### Endpoint
//
// - Method: `GET`
// - URL: `https://localhost:1337/api/individualPayments`
//
// #### Parameters
//
// - `sector`: Sector of the garden plot (string)
// - `avenue`: Avenue of the garden plot (string)
// - `number`: Number of the garden plot (string)
//
// #### Response
//
// The response body contains individual payment details for the specified address parameters.
//
// to moja funkcja
//   This endpoint retrieves individual payments based on the provided address parameters.
// findUserPaymentsByAddress(sector: string | null, avenue: string | null, number: number | null, gardenPlots: GardenPlot[]): IndividualPayments | null {
//   const matchingGardenPlot = gardenPlots.find((gardenPlot) =>
//     gardenPlot.sector === sector && gardenPlot.avenue === avenue && gardenPlot.number === number
//   );
//   const leaseholderID = matchingGardenPlot ? matchingGardenPlot.leaseholderID : null;
//   const individualPayment = this.individualPayments.find((payment) => payment.userID === leaseholderID)
//   if (individualPayment) {
//     return individualPayment
//   } else return null
// }
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// ### POST request to add New Individual Payment
//
// Adds a new individual payment for a specific user.
//
// #### Endpoint
//
// - Method: `POST`
// - URL: `https://localhost:1337/api/individualPayments/:userId/addPayment`
//
// #### Parameters
//
// - `userId`: ID of the user for whom the payment is being added (string)
//
// #### Request Body
//
// The request body should contain details of the new individual payment.
//
//   ```typescript
// export interface IndividualPayment {
//   // Payment details
// }
// .
// .
// moja funkcja
// addNewIndividualPayment(userId: string | undefined, individualPayment: IndividualPayment) {
//   const foundUserIndex = this.individualPayments.findIndex(payment => payment.userID === userId);
//   if (foundUserIndex !== -1) {
//     // @ts-ignore
//     this.individualPayments[foundUserIndex].paymentsList.push(individualPayment);
//   }
// }
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// ### DELETE request to delete Individual Payment
//
// Deletes an individual payment for a specific user.
//
// #### Endpoint
//
// - Method: `DELETE`
// - URL: `https://localhost:1337/api/individualPayments/:userID/deletePayment/:paymentID`
//
// #### Parameters
//
// - `userID`: ID of the user whose payment is to be deleted
// - `paymentID`: ID of the payment to be deleted
//
// This endpoint allows deleting an individual payment for a specific user by providing the user ID and the payment ID in the URL.
// .
// .
// .Moja funkcja
// deleteIndividualPayment(userID: string, paymentID: string) {
//   const foundUserIndex = this.individualPayments.findIndex(payments => payments.userID === userID);
//   if (foundUserIndex !== -1) {
//     // @ts-ignore
//     const foundPaymentIndex = this.individualPayments[foundUserIndex].paymentsList.findIndex(payment => payment.paymentID === paymentID);
//     if (foundPaymentIndex !== -1) {
//       // @ts-ignore
//       this.individualPayments[foundUserIndex].paymentsList.splice(foundPaymentIndex, 1);
//     }
//   }
// }
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .### PUT request to edit Lease Fees
//
// Edits the lease fees information.
//
// #### Endpoint
//
// - Method: `PUT`
// - URL: `https://localhost:1337/api/payments/leaseFees`
//
// #### Request Body
//
// The request body should contain an array of updated lease fee details.
//
// ```typescript
// export interface Fee {
//   // Properties related to fees
// }
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .### PUT request to edit Utility Fees
//
// Edits the utility fees information.
//
// #### Endpoint
//
// - Method: `PUT`
// - URL: `https://localhost:1337/api/payments/utilityFees`
//
// #### Request Body
//
// The request body should contain an array of updated utility fee details.
//
// ```typescript
// export interface Fee {
//   // Właściwości związane z opłatami
// }
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .### PUT request to edit Additional Fee
//
// Edits the additional fee information.
//
// #### Endpoint
//
// - Method: `PUT`
// - URL: `https://localhost:1337/api/payments/additionalFees/:feeID`
//
// #### Parameters
//
// - `feeID`: ID of the additional fee to be edited
//
// #### Request Body
//
// The request body should contain the updated details of the additional fee.
//
// ```typescript
// export interface Fee {
//   // Właściwości związane z opłatami
// }
// moja funkcja
// editAdditionalFee(payment: Fee | undefined) {
//   // @ts-ignore
//   const foundIndex = this.payments.additionalFees.findIndex(curentPayment => curentPayment.feeID === payment.feeID);
//   if (foundIndex !== -1) {
//     if (payment) {
//       this.payments.additionalFees[foundIndex] = payment;
//     }
//   }
// }
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .### POST request to add Additional Fee
//
// Adds a new additional fee.
//
// #### Endpoint
//
// - Method: `POST`
// - URL: `https://localhost:1337/api/payments/additionalFees`
//
// #### Request Body
//
// The request body should contain details of the additional fee to be added.
//
// ```typescript
// export interface Fee {
//   // Właściwości związane z opłatami
// }
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .### PUT request to update Payment Date
//
// Updates the payment date.
//
// #### Endpoint
//
// - Method: `PUT`
// - URL: `https://localhost:1337/api/payments/date`
//
// #### Request Body
//
// The request body should contain the updated date.
//
// ```typescript
// {
//   date: Date;
// }
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .### Confirm All Payments
//
// Metoda `POST`
//
// Endpoint: `https://localhost:1337/api/confirm-payments`
//
// #### Zapytanie
//
// Brak ciała zapytania.
//
// #### Odpowiedź
//
// Odpowiedź zawiera dane dotyczące potwierdzenia wszystkich płatności.
//
// ```typescript
// confirmAllPayments(): Observable<any> {
//   const confirmPaymentsURL = 'https://localhost:1337/api/confirm-payments';
//   return this.httpClient.post<any>(confirmPaymentsURL, {});
// }




// typy w razie jakby nie były rozpisane
// export interface Fee {
//   feeID: string
//   name: string;
//   type: TypeOfFee,
//   value: number
// }
//
// export enum TypeOfFee {
//   PerMeter = "Za metr",
//   PerGardenPlot = "Za działke"
// }
//
// export interface Payments {
//   leaseFees: Fee[];
//   utilityFees: Fee[];
//   additionalFees: Fee[];
//   date: Date;
// }
//
// export interface IndividualPayment {
//   paymentID: string
//   name: string,
//   value: number,
//   date: Date
// }
//
// export interface IndividualPayments {
//   userID: string,
//   paymentsList?: IndividualPayment[]
// }


