import {Injectable} from '@angular/core';
import {Counter, CounterType} from "./counter";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountersService {
  private counters: Counter[] = [
    {
      id: 'counter-1',
      addressC: 'Sektor A, al. Borówkowa, 1',
      measurement: 42,
      type: CounterType.Electric,
      gardenPlotID: 217,
    },
    {
      id: 'counter-2',
      addressC: 'Sektor B, ul. Jagodowa, 2',
      measurement: 17,
      type: CounterType.Water,
      gardenPlotID: 216,
    },
    {
      id: 'counter-3',
      addressC: 'Sektor C, ul. Malinowa, 3',
      measurement: 69,
      type: CounterType.Electric,
      gardenPlotID: 215,
    },
    {
      id: 'counter-4',
      addressC: 'ogólny',
      measurement: 33,
      type: CounterType.Water,
      gardenPlotID: null,
    },
    {
      id: 'counter-5',
      addressC: 'Sektor B, ul. Jagodowa, 5',
      measurement: 91,
      type: CounterType.Electric,
      gardenPlotID: 214,
    },
    {
      id: 'counter-6',
      addressC: 'Sektor C, ul. Malinowa, 6',
      measurement: 5,
      type: CounterType.Water,
      gardenPlotID: 213,
    },
    {
      id: 'counter-7',
      addressC: 'Sektor A, al. Borówkowa, 7',
      measurement: 74,
      type: CounterType.Electric,
      gardenPlotID: 212,
    },
    {
      id: 'counter-8',
      addressC: 'parking',
      measurement: 26,
      type: CounterType.Water,
      gardenPlotID: null,
    },
    {
      id: 'counter-9',
      addressC: 'Sektor C, ul. Malinowa, 9',
      measurement: 50,
      type: CounterType.Electric,
      gardenPlotID: 211,
    },
    {
      id: 'counter-10',
      addressC: 'Sektor A, al. Borówkowa, 10',
      measurement: 84,
      type: CounterType.Water,
      gardenPlotID: 210,
    },
    {
      id: 'counter-11',
      addressC: 'Sektor B, ul. Jagodowa, 11',
      measurement: 22,
      type: CounterType.Electric,
      gardenPlotID: 209,
    },
    {
      id: 'counter-12',
      addressC: 'Sektor C, ul. Malinowa, 12',
      measurement: 68,
      type: CounterType.Water,
      gardenPlotID: 208,
    },
    {
      id: 'counter-13',
      addressC: 'Sektor A, al. Borówkowa, 13',
      measurement: 39,
      type: CounterType.Electric,
      gardenPlotID: 207,
    },
    {
      id: 'counter-14',
      addressC: 'Sektor B, ul. Jagodowa, 14',
      measurement: 13,
      type: CounterType.Water,
      gardenPlotID: 206,
    },
    {
      id: 'counter-15',
      addressC: 'Sektor C, ul. Malinowa, 15',
      measurement: 58,
      type: CounterType.Electric,
      gardenPlotID: 205,
    },
    {
      id: 'counter-16',
      addressC: 'Sektor A, al. Borówkowa, 16',
      measurement: 71,
      type: CounterType.Water,
      gardenPlotID: 204,
    },
    {
      id: 'counter-17',
      addressC: 'Sektor B, ul. Jagodowa, 17',
      measurement: 9,
      type: CounterType.Electric,
      gardenPlotID: 203,
    },
    {
      id: 'counter-18',
      addressC: 'Sektor C, ul. Malinowa, 18',
      measurement: 92,
      type: CounterType.Water,
      gardenPlotID: 202,
    },
    {
      id: 'counter-19',
      addressC: 'Sektor A, al. Borówkowa, 19',
      measurement: 31,
      type: CounterType.Electric,
      gardenPlotID: 201,
    },
    {
      id: 'counter-20',
      addressC: 'Sektor B, ul. Jagodowa, 20',
      measurement: 7,
      type: CounterType.Water,
      gardenPlotID: 200,
    },
  ];

  constructor(private httpClient: HttpClient) {
  }

  private readonly countersUrl = 'https://localhost:1337/api/counters';

  getAllCounters(): Observable<Counter[]>  {
    return of (this.counters)
  }

  // TODO
  getAllCounters2(): Observable<Counter[]> {
    return this.httpClient.get<Counter[]>(this.countersUrl);
  }

  addCounter(counter: Counter):Observable<any> {
    this.counters.push(counter)
    return of('dodano licznik')
  }

  // TODO
  addCounter2(counter: Counter): Observable<any> {
    return this.httpClient.post(this.countersUrl, counter);
  }

  updateMeasurement(counterID: string, newMeasurement: number):Observable<any> {
    //zmienić stan konta użytkownika
    const foundCounterIndex = this.counters.findIndex(counter => counter.id === counterID);

    if (foundCounterIndex !== -1) {
      this.counters[foundCounterIndex].measurement = newMeasurement;
    }
    return of('aktualizacja pomiaru zakończona sukcesem')
  }

  // TODO
  updateMeasurement2(counterID: string, newMeasurement: number): Observable<any> {
    const url = `${this.countersUrl}/${counterID}`;
    return this.httpClient.put(url, { measurement: newMeasurement });
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
// ### GET request to retrieve Counters
//
// Retrieves a list of counters.
//
// #### Endpoint
//
// - Method: `GET`
// - URL: `https://localhost:1337/api/counters`
//
// #### Response
//
// The response body contains an array of counter objects.
//
//   ```typescript
// export interface Counter {
//   id: string;
//   addressC: string | null;
//   measurement: number;
//   type: CounterType;
//   gardenPlotID: string | null;
// }
//
// export enum CounterType {
//   Electric = 'prąd',
//   Water = 'woda'
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
//
// ### POST request to add a new Counter
//
// Adds a new counter to the list of counters.
//
// #### Endpoint
//
// - Method: `POST`
// - URL: `https://localhost:1337/api/counters`
//
// #### Request Body
//
// The request body should contain information about the new counter to be added.
//
//   ```typescript
// export interface Counter {
//   id: string;
//   addressC: string | null;
//   measurement: number;
//   type: CounterType;
//   gardenPlotID: string | null;
// }
//
// export enum CounterType {
//   Electric = 'prąd',
//   Water = 'woda'
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
// ### PUT request to update Counter Measurement
//
// Updates the measurement of a specific counter.
//
// #### Endpoint
//
// - Method: `PUT`
// - URL: `https://localhost:1337/api/counters/:id`
//
// #### Request Body
//
// The request body should contain the updated measurement value.
//
//   ```typescript
// {
//   measurement: number;
// }



