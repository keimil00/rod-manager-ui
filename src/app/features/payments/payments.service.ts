import {Injectable} from '@angular/core';
import {Fee, IndividualPayment, IndividualPayments, Payments, TypeOfFee} from "./payments";
import {HttpClient} from "@angular/common/http";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {EditingLeaseFeeComponent} from "./editing-lease-fee/editing-lease-fee.component";

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
        date: new Date(2023, 10, 31)
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


    constructor(private httpClient: HttpClient) {
    }

    getPayments(): Payments {
        return this.payments
    }

    //TODO Backend
    // getPayments(): Observable<Payments> {
    //   const params = new HttpParams()
    //   return this.httpClient.get<Payments>('https://localhost:1337/api/payments');
    // }

    //   TODO pamietac ze przy rejestracji trzeba dodawac to do listy
    findUserPaymentsByAddress(sector: string | null, avenue: string | null, number: number | null, gardenPlots: GardenPlot[]): IndividualPayments | null {
        const matchingGardenPlot = gardenPlots.find((gardenPlot) =>
            gardenPlot.sector === sector && gardenPlot.avenue === avenue && gardenPlot.number === number
        );
        const leaseholderID = matchingGardenPlot ? matchingGardenPlot.leaseholderID : null;
        const individualPayment = this.individualPayments.find((payment) => payment.userID === leaseholderID)
        if (individualPayment) {
            return individualPayment
        } else return null
    }

    addNewIndividualPayment(userId: string | undefined, individualPayment: IndividualPayment) {
        const foundUserIndex = this.individualPayments.findIndex(payment => payment.userID === userId);
        if (foundUserIndex !== -1) {
            // @ts-ignore
            this.individualPayments[foundUserIndex].paymentsList.push(individualPayment);
        }
    }

    deleteIndividualPayment(userID: string, paymentID: string) {
        const foundUserIndex = this.individualPayments.findIndex(payments => payments.userID === userID);
        if (foundUserIndex !== -1) {
            // @ts-ignore
            const foundPaymentIndex = this.individualPayments[foundUserIndex].paymentsList.findIndex(payment => payment.paymentID === paymentID);
            if (foundPaymentIndex !== -1) {
                // @ts-ignore
                this.individualPayments[foundUserIndex].paymentsList.splice(foundPaymentIndex, 1);
            }
        }
    }

    editLeaseFee(payments: Fee[]) {
        this.payments.leaseFees = payments;
    }

    editUtilityFee(payments: Fee[]) {
        this.payments.utilityFees = payments;
    }

    editAdditionalFee(payment: Fee | undefined) {
        // @ts-ignore
        const foundIndex = this.payments.additionalFees.findIndex(curentPayment => curentPayment.feeID === payment.feeID);
        if (foundIndex !== -1) {
            if (payment) {
                this.payments.additionalFees[foundIndex] = payment;
            }
        }
    }

    addAdditionalFee(payment: Fee) {
        this.payments.additionalFees.push(payment)
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
