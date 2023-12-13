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
      id: 1,
      name: 'counter-1',
      addressC: 'Sektor A, al. Borówkowa, 1',
      measurement: 42,
      type: CounterType.Electric,
      gardenPlotID: 217,
    },
    {
      id: 3,
      name: 'counter-3',
      addressC: 'Sektor C, ul. Malinowa, 3',
      measurement: 69,
      type: CounterType.Electric,
      gardenPlotID: 215,
    },
    {
      id: 5,
      name: 'counter-5',
      addressC: 'Sektor B, ul. Jagodowa, 5',
      measurement: 91,
      type: CounterType.Electric,
      gardenPlotID: 214,
    },
    {
      id: 7,
      name: 'counter-7',
      addressC: 'Sektor A, al. Borówkowa, 7',
      measurement: 74,
      type: CounterType.Electric,
      gardenPlotID: 212,
    },
    {
      id: 9,
      name: 'counter-9',
      addressC: 'Sektor C, ul. Malinowa, 9',
      measurement: 50,
      type: CounterType.Electric,
      gardenPlotID: 211,
    },
    {
      id: 11,
      name: 'counter-11',
      addressC: 'Sektor B, ul. Jagodowa, 11',
      measurement: 22,
      type: CounterType.Electric,
      gardenPlotID: 209,
    },
    {
      id: 13,
      name: 'counter-13',
      addressC: 'Sektor A, al. Borówkowa, 13',
      measurement: 39,
      type: CounterType.Electric,
      gardenPlotID: 207,
    },
    {
      id: 15,
      name: 'counter-15',
      addressC: 'Sektor C, ul. Malinowa, 15',
      measurement: 58,
      type: CounterType.Electric,
      gardenPlotID: 205,
    },
    {
      id: 17,
      name: 'counter-17',
      addressC: 'Sektor B, ul. Jagodowa, 17',
      measurement: 9,
      type: CounterType.Electric,
      gardenPlotID: 203,
    },
    {
      id: 19,
      name: 'counter-19',
      addressC: 'Sektor A, al. Borówkowa, 19',
      measurement: 31,
      type: CounterType.Electric,
      gardenPlotID: 201,
    },
  ];
  private countersWater: Counter[] = [
    {
      id: 2,
      name: 'counter-2',
      addressC: 'Sektor B, ul. Jagodowa, 2',
      measurement: 17,
      type: CounterType.Water,
      gardenPlotID: 216,
    },
    {
      id: 4,
      name: 'counter-4',
      addressC: 'ogólny',
      measurement: 33,
      type: CounterType.Water,
      gardenPlotID: null,
    },
    {
      id: 6,
      name: 'counter-6',
      addressC: 'Sektor C, ul. Malinowa, 6',
      measurement: 5,
      type: CounterType.Water,
      gardenPlotID: 213,
    },
    {
      id: 8,
      name: 'counter-8',
      addressC: 'parking',
      measurement: 26,
      type: CounterType.Water,
      gardenPlotID: null,
    },
    {
      id: 10,
      name: 'counter-10',
      addressC: 'Sektor A, al. Borówkowa, 10',
      measurement: 84,
      type: CounterType.Water,
      gardenPlotID: 210,
    },
    {
      id: 12,
      name: 'counter-12',
      addressC: 'Sektor C, ul. Malinowa, 12',
      measurement: 68,
      type: CounterType.Water,
      gardenPlotID: 208,
    },
    {
      id: 14,
      name: 'counter-14',
      addressC: 'Sektor B, ul. Jagodowa, 14',
      measurement: 13,
      type: CounterType.Water,
      gardenPlotID: 206,
    },
    {
      id: 16,
      name: 'counter-16',
      addressC: 'Sektor A, al. Borówkowa, 16',
      measurement: 71,
      type: CounterType.Water,
      gardenPlotID: 204,
    },
    {
      id: 18,
      name: 'counter-18',
      addressC: 'Sektor C, ul. Malinowa, 18',
      measurement: 92,
      type: CounterType.Water,
      gardenPlotID: 202,
    },
    {
      id: 20,
      name: 'counter-20',
      addressC: 'Sektor B, ul. Jagodowa, 20',
      measurement: 7,
      type: CounterType.Water,
      gardenPlotID: 200,
    },
    {
      id: 21,
      name: 'counter-21',
      addressC: 'Sektor C, ul. Jagodowa, 20',
      measurement: 700,
      type: CounterType.Water,
      gardenPlotID: 200,
    },
  ];

  constructor(private httpClient: HttpClient) {
  }

  private readonly countersUrl = 'api/meters/meters/';

  getElectricCounters(index: number, size: number): Observable<Page<Counter>> {
    const CountersOnPage = this.countersElectric.slice((index - 1) * size, (index - 1) * size + size);
    const count = this.countersElectric.length;
    const page: Page<Counter> = {count, results: CountersOnPage};

    return of(page);
  }

  getElectricCounters2(index: number, size: number): Observable<Page<Counter>> {
    const url = `${this.countersUrl}?page=${index}&page_size=${size}&type=${CounterType.Electric}`;
    return this.httpClient.get<Page<CounterExternal>>(url).pipe(
      map((page: Page<CounterExternal>) => {
          const newPage: Page<Counter> = {
            results: page.results.map((counter: CounterExternal) => {

              const counter1: Counter = {
                id: 1,
                name: counter.serial,
                addressC: counter.adress,
                measurement: counter.measurement,
                type: CounterType.Electric,
                gardenPlotID: counter.garden.gardenPlotID,
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

  getWaterCounters(index: number, size: number): Observable<Page<Counter>> {
    const CountersOnPage = this.countersWater.slice((index - 1) * size, (index - 1) * size + size);
    const count = this.countersWater.length;
    const page: Page<Counter> = {count, results: CountersOnPage};

    return of(page);
  }

  getWaterCounters2(index: number, size: number): Observable<Page<Counter>> {
    const url = `${this.countersUrl}?page=${index}&page_size=${size}&type=${CounterType.Water}}`;
    return this.httpClient.get<Page<CounterExternal>>(url).pipe(
      map((page: Page<CounterExternal>) => {
          const newPage: Page<Counter> = {
            results: page.results.map((counter: CounterExternal) => {

              const counter1: Counter = {
                id: 1,
                name: counter.serial,
                addressC: counter.adress,
                measurement: counter.measurement,
                type: CounterType.Water,
                gardenPlotID: counter.garden.gardenPlotID,
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

  addCounter(counter: Counter): Observable<any> {
    if (counter.type === CounterType.Electric) {
      this.countersElectric.push(counter)
      return of('dodano licznik')
    } else {
      this.countersWater.push(counter)
      return of('dodano licznik')
    }
  }

  // TODO
  addCounter2(counter: Counter): Observable<any> {
    return this.httpClient.post(this.countersUrl, counter);
  }

  updateMeasurement(counterID: number, newMeasurement: number, type: CounterType): Observable<any> {
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

  // TODO
  updateMeasurement2(counterID: string, newMeasurement: number): Observable<any> {
    const url = `${this.countersUrl}/${counterID}`;
    return this.httpClient.put(url, {measurement: newMeasurement});
  }
}

