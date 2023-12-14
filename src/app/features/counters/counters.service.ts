import {Injectable} from '@angular/core';
import {Counter, CounterExternal, CounterType} from "./counter";
import {forkJoin, map, mergeMap, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Page} from "../../shared/paginator/page.model";
import {GardenPlotExternal, GardenPlotWithLeaseholder, PlotStatus} from "../list-of-garden-plot/garden-plot";

@Injectable({
  providedIn: 'root'
})
export class CountersService {
  private countersElectric: Counter[] = [
    {
      id: 'counter-1',
      addressC: 'Sektor A, al. Borówkowa, 1',
      measurement: 42,
      type: CounterType.Electric,
      gardenPlotID: 217,
    },
    {
      id: 'counter-3',
      addressC: 'Sektor C, ul. Malinowa, 3',
      measurement: 69,
      type: CounterType.Electric,
      gardenPlotID: 215,
    },
    {
      id: 'counter-5',
      addressC: 'Sektor B, ul. Jagodowa, 5',
      measurement: 91,
      type: CounterType.Electric,
      gardenPlotID: 214,
    },
    {
      id: 'counter-7',
      addressC: 'Sektor A, al. Borówkowa, 7',
      measurement: 74,
      type: CounterType.Electric,
      gardenPlotID: 212,
    },
    {
      id: 'counter-9',
      addressC: 'Sektor C, ul. Malinowa, 9',
      measurement: 50,
      type: CounterType.Electric,
      gardenPlotID: 211,
    },
    {
      id: 'counter-11',
      addressC: 'Sektor B, ul. Jagodowa, 11',
      measurement: 22,
      type: CounterType.Electric,
      gardenPlotID: 209,
    },
    {
      id: 'counter-13',
      addressC: 'Sektor A, al. Borówkowa, 13',
      measurement: 39,
      type: CounterType.Electric,
      gardenPlotID: 207,
    },
    {
      id: 'counter-15',
      addressC: 'Sektor C, ul. Malinowa, 15',
      measurement: 58,
      type: CounterType.Electric,
      gardenPlotID: 205,
    },
    {
      id: 'counter-17',
      addressC: 'Sektor B, ul. Jagodowa, 17',
      measurement: 9,
      type: CounterType.Electric,
      gardenPlotID: 203,
    },
    {
      id: 'counter-19',
      addressC: 'Sektor A, al. Borówkowa, 19',
      measurement: 31,
      type: CounterType.Electric,
      gardenPlotID: 201,
    },
  ];
  private countersWater: Counter[] = [
    {
      id: 'counter-2',
      addressC: 'Sektor B, ul. Jagodowa, 2',
      measurement: 17,
      type: CounterType.Water,
      gardenPlotID: 216,
    },
    {
      id: 'counter-4',
      addressC: 'ogólny',
      measurement: 33,
      type: CounterType.Water,
      gardenPlotID: null,
    },
    {
      id: 'counter-6',
      addressC: 'Sektor C, ul. Malinowa, 6',
      measurement: 5,
      type: CounterType.Water,
      gardenPlotID: 213,
    },
    {
      id: 'counter-8',
      addressC: 'parking',
      measurement: 26,
      type: CounterType.Water,
      gardenPlotID: null,
    },
    {
      id: 'counter-10',
      addressC: 'Sektor A, al. Borówkowa, 10',
      measurement: 84,
      type: CounterType.Water,
      gardenPlotID: 210,
    },
    {
      id: 'counter-12',
      addressC: 'Sektor C, ul. Malinowa, 12',
      measurement: 68,
      type: CounterType.Water,
      gardenPlotID: 208,
    },
    {
      id: 'counter-14',
      addressC: 'Sektor B, ul. Jagodowa, 14',
      measurement: 13,
      type: CounterType.Water,
      gardenPlotID: 206,
    },
    {
      id: 'counter-16',
      addressC: 'Sektor A, al. Borówkowa, 16',
      measurement: 71,
      type: CounterType.Water,
      gardenPlotID: 204,
    },
    {
      id: 'counter-18',
      addressC: 'Sektor C, ul. Malinowa, 18',
      measurement: 92,
      type: CounterType.Water,
      gardenPlotID: 202,
    },
    {
      id: 'counter-20',
      addressC: 'Sektor B, ul. Jagodowa, 20',
      measurement: 7,
      type: CounterType.Water,
      gardenPlotID: 200,
    },
    {
      id: 'counter-21',
      addressC: 'Sektor C, ul. Jagodowa, 20',
      measurement: 700,
      type: CounterType.Water,
      gardenPlotID: 200,
    },
  ];

  constructor(private httpClient: HttpClient) {
  }

  private readonly countersUrl = 'api/meters/meters/';
  private readonly recordsUrl = 'api/meters/records/';

  getElectricCounters2(index: number, size: number): Observable<Page<Counter>> {
    const CountersOnPage = this.countersElectric.slice((index - 1) * size, (index - 1) * size + size);
    const count = this.countersElectric.length;
    const page: Page<Counter> = {count, results: CountersOnPage};

    return of(page);
  }

  getElectricCounters(index: number, size: number): Observable<Page<Counter>> {
    const url = `${this.countersUrl}?page=${index}&page_size=${size}&type=${CounterType.Electric}`;
    return this.httpClient.get<Page<CounterExternal>>(url).pipe(
      map((page: Page<CounterExternal>) => {
          const newPage: Page<Counter> = {
            results: page.results.map((counter: CounterExternal) => {

              const gardenPlot=counter.garden
              let gardenID = null
              if(gardenPlot!==null){
                gardenID = gardenPlot
              }
              const counter1: Counter = {
                id: counter.serial,
                addressC: counter.adress,
                measurement: parseInt(counter.value, 10),
                type: CounterType.Electric,
                gardenPlotID: gardenID,
              }
              return counter1;
            }),
            count: page.count
          };
          return newPage;
        }
      )
    )
  }

  getWaterCounters2(index: number, size: number): Observable<Page<Counter>> {
    const CountersOnPage = this.countersWater.slice((index - 1) * size, (index - 1) * size + size);
    const count = this.countersWater.length;
    const page: Page<Counter> = {count, results: CountersOnPage};

    return of(page);
  }

  getWaterCounters(index: number, size: number): Observable<Page<Counter>> {
    const url = `${this.countersUrl}?page=${index}&page_size=${size}&type=${CounterType.Water}`;
    return this.httpClient.get<Page<CounterExternal>>(url).pipe(
      map((page: Page<CounterExternal>) => {
          const newPage: Page<Counter> = {
            results: page.results.map((counter: CounterExternal) => {

              const gardenPlot=counter.garden
              let gardenID = null
              if(gardenPlot!==null){
                gardenID = gardenPlot
              }

              const counter1: Counter = {
                id: counter.serial,
                addressC: counter.adress,
                measurement: parseInt(counter.value, 10),
                type: CounterType.Water,
                gardenPlotID: gardenID,
              }
              return counter1;
            }),
            count: page.count
          };
          return newPage;
        }
      )
    )
  }

  getAllCounters(): Observable<Counter[]> {
    let electric: Counter[] = [];
    let water: Counter[] = [];

    return forkJoin({
      electric: this.getElectricCounters(1, 10000),
      water: this.getWaterCounters(1, 10000),
    }).pipe(
      mergeMap(data => {
        electric = data.electric.results;
        water = data.water.results;

        return of(electric.concat(water));
      })
    );
  }

  // // TODO
  // getAllCounters2(): Observable<Counter[]> {
  //   return this.httpClient.get<Counter[]>(this.countersUrl);
  // }

  addCounter2(counter: Counter): Observable<any> {
    if (counter.type === CounterType.Electric) {
      this.countersElectric.push(counter)
      return of('dodano licznik')
    } else {
      this.countersWater.push(counter)
      return of('dodano licznik')
    }
  }

  // TODO
  addCounter(counter: Counter): Observable<any> {
    const body = {
      serial: counter.id,
      type: counter.type,
      adress: counter.addressC,
      value: counter.measurement,
      garden: counter.gardenPlotID
    }
    return this.httpClient.post(this.countersUrl, body);
  }

  updateMeasurement2(counterID: string, newMeasurement: number, type: CounterType): Observable<any> {
    if (type === CounterType.Electric) {
      //zmienić stan konta użytkownika
      const foundCounterIndex = this.countersElectric.findIndex(counter => counter.id === counterID);

      if (foundCounterIndex !== -1) {
        this.countersElectric[foundCounterIndex].measurement = newMeasurement;
      }
      return of('aktualizacja pomiaru zakończona sukcesem')
    } else {
      //zmienić stan konta użytkownika
      const foundCounterIndex = this.countersWater.findIndex(counter => counter.id === counterID);

      if (foundCounterIndex !== -1) {
        this.countersWater[foundCounterIndex].measurement = newMeasurement;
      }
      return of('aktualizacja pomiaru zakończona sukcesem')
    }

  }

  updateMeasurement(counterID: string, newMeasurement: number): Observable<any> {

    const body= {
      value: newMeasurement,
      meter: counterID,
    }

    return this.httpClient.post(this.recordsUrl, body);
  }
}

