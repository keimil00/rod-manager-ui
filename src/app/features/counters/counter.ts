import {GardenPlot} from "../list-of-garden-plot/garden-plot";

export interface Counter {
  id: number;
  name: string;
  addressC: string| null;
  measurement: number;
  type: CounterType;
  gardenPlotID: number| null;
}

export interface CounterExternal {
      serial: string,
      garden: GardenPlot
      type: string,
      adress: string
      measurement: number,
}

export enum CounterType {
  Electric = 'prąd',
  Water = 'woda'
}
