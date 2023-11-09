import {PlotStatus} from "../list-of-garden-plot/garden-plot";

export interface Counter {
  id: string;
  addressC: string| null;
  measurement: number;
  type: CounterType;
  gardenPlotID: string| null;
}

export enum CounterType {
  Electric = 'prąd',
  Water = 'woda'
}
