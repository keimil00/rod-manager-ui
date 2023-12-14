import {GardenPlot} from "../list-of-garden-plot/garden-plot";

export interface Counter {
  id: string;
  addressC: string| null;
  measurement: number;
  type: CounterType;
  gardenPlotID: number| null;
}

export interface CounterExternal {
      serial: string,
      garden: number|null,
      type: string,
      adress: string
      value: string,
}

export enum CounterType {
  Electric = 'prąd',
  Water = 'woda'
}
