import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlotStatus} from "../list-of-garden-plot/garden-plot";
import {GardenPlotInfo, GardenPlotInfoFee, IndividualPaymentGardenPlot, MediaIndividualFee} from "./gardenPlotInfo";
import {MatTableDataSource} from "@angular/material/table";
import {Fee, IndividualPayment, CalculationType} from "../payments/payments";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GardenPlotInfoService {

  private leaseFees: GardenPlotInfoFee[] = [
    {
      name: 'PZD',
      type: CalculationType.PerMeter,
      value: 0.12,
      sum: 200,
    },
    {
      name: 'Opłata ogrodowa',
      type: CalculationType.PerMeter,
      value: 0.61,
      sum: 200,
    },
    {
      name: 'Opłata Inwestycyjna',
      type: CalculationType.PerMeter,
      value: 0.5,
      sum: 200,
    },
    {
      name: 'Razem',
      type: null,
      value: null,
      sum: 600,
    }
  ];
  private utilityFees: GardenPlotInfoFee[] = [
    {
      name: 'Prąd',
      type: CalculationType.PerMeter,
      value: 0.12,
      sum: 200,
    },
    {
      name: 'Woda',
      type: CalculationType.PerMeter,
      value: 0.61,
      sum: 200,
    },
    {
      name: 'Razem',
      type: null,
      value: null,
      sum: 400,
    }
  ];
  private additionalFees: GardenPlotInfoFee[] = [
    {
      name: 'Koszenie trawy',
      type: CalculationType.PerGardenPlot,
      value: 70,
      sum: 200,
    },
    {
      name: 'Grabienie liści',
      type: CalculationType.PerGardenPlot,
      value: 40,
      sum: 200,
    },
    {
      name: 'Razem',
      type: null,
      value: null,
      sum: 400,
    }
  ];
  private individualFees: IndividualPaymentGardenPlot [] =
    [
      {
        name: 'Opłata za przekroczenie limitu wody',
        value: 40,
      },
      {
        name: 'Opłata za opiekę nad roślinami w czasie urlopu',
        value: 100,
      },
      {
        name: 'Razem',
        value: 140,
      },
    ]
  private mediaIndividuals: MediaIndividualFee[] =
    [
      {
        name: 'Prąd',
        mediaConsumption: '10 kW',
        value: 200
      },
      {
        name: 'Woda',
        mediaConsumption: '10 m³',
        value: 150
      },
      {
        name: 'Razem',
        mediaConsumption: null,
        value: 350
      },
    ]


  private gardenPlotInfo: GardenPlotInfo = {
    sector: "A",
    avenue: "Avenure",
    number: 1,
    area: 60,
    leaseholder: "Jan Kowalski",
    value: 3000,
    date: new Date(2024, 2, 7),

    mediaIndividual: this.mediaIndividuals,
    leaseFees: this.leaseFees,
    utilityFees: this.utilityFees,
    additionalFees: this.additionalFees,
    individualFees: this.individualFees
  }

  constructor(private httpClient: HttpClient) {
  }

  private readonly gardenPlotInfoUrl = '/api/my-garden/';


  getGardenPlotInfo2(): Observable<GardenPlotInfo> {
    return of (this.gardenPlotInfo)
  }

  getGardenPlotInfo(): Observable<GardenPlotInfo> {
    return this.httpClient.get<GardenPlotInfo>(this.gardenPlotInfoUrl);
  }
}



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
//
// TU trzeba wziac dane działki aktualnie zalogowanego użytkownika
// ### GET request to retrieve Garden Plot Info
//
// Retrieves information related to a garden plot.
//
// #### Endpoint
//
// - Method: `GET`
// - URL: `https://localhost:1337/api/garden-plot-info`
//
// #### Response
//
// The response body contains detailed information about a garden plot.
//
//   ```typescript
// interface GardenPlotInfo {
//   sector: string | null;
//   avenue: string | null;
//   number: number;
//   area: number | null;
//   leaseholder: string | null;
//   value: number;
//   date: Date;
//
//   mediaIndividual: MediaIndividualFee[];
//   leaseFees: GardenPlotInfoFee[];
//   utilityFees: GardenPlotInfoFee[];
//   additionalFees: GardenPlotInfoFee[];
//   individualFees: IndividualPaymentGardenPlot[];
// }
//
// interface GardenPlotInfoFee {
//   name: string;
//   type: TypeOfFee | null;
//   value: number | null;
//   sum: number;
// }
//
// interface MediaIndividualFee {
//   name: string;
//   mediaConsumption: string | null;
//   value: number;
// }
//
// interface IndividualPaymentGardenPlot {
//   name: string;
//   value: number;
// }
//
// enum TypeOfFee {
//   PerMeter,
//   PerGardenPlot
// }
// Example response:
// {
//   "sector": "A",
//   "avenue": "Avenue",
//   "number": 1,
//   "area": 60,
//   "leaseholder": "Jan Kowalski",
//   "value": 3000,
//   "date": "2024-03-07T00:00:00.000Z",
//   "mediaIndividual": [
//   {
//     "name": "Prąd",
//     "mediaConsumption": "10 KW",
//     "value": 200
//   },
//   {
//     "name": "Woda",
//     "mediaConsumption": "10 m³",
//     "value": 150
//   },
//   {
//     "name": "Razem",
//     "mediaConsumption": null,
//     "value": 350
//   }
// ],
//   "leaseFees": [
//   {
//     "name": "PZD",
//     "type": "PerMeter",
//     "value": 0.12,
//     "sum": 200
//   },
//   {
//     "name": "Opłata ogrodowa",
//     "type": "PerMeter",
//     "value": 0.61,
//     "sum": 200
//   },
//   {
//     "name": "Opłata Inwestycyjna",
//     "type": "PerMeter",
//     "value": 0.5,
//     "sum": 200
//   },
//   {
//     "name": "Razem",
//     "type": null,
//     "value": null,
//     "sum": 600
//   }
// ],
//   "utilityFees": [
//   {
//     "name": "Prąd",
//     "type": "PerMeter",
//     "value": 0.12,
//     "sum": 200
//   },
//   {
//     "name": "Woda",
//     "type": "PerMeter",
//     "value": 0.61,
//     "sum": 200
//   },
//   {
//     "name": "Razem",
//     "type": null,
//     "value": null,
//     "sum": 400
//   }
// ],
//   "additionalFees": [
//   {
//     "name": "Koszenie trawy",
//     "type": "PerGardenPlot",
//     "value": 70,
//     "sum": 200
//   },
//   {
//     "name": "Grabienie liści",
//     "type": "PerGardenPlot",
//     "value": 40,
//     "sum": 200
//   },
//   {
//     "name": "Razem",
//     "type": null,
//     "value": null,
//     "sum": 400
//   }
// ],
//   "individualFees": [
//   {
//     "name": "Opłata za przekroczenie limitu wody",
//     "value": 40
//   },
//   {
//     "name": "Opłata za opiekę nad roślinami w czasie urlopu",
//     "value": 100
//   },
//   {
//     "name": "Razem",
//     "value": 140
//   }
// ]
// }

