export interface Counter {
  id: number;
  name: string;
  addressC: string| null;
  measurement: number;
  type: CounterType;
  gardenPlotID: number| null;
}

export enum CounterType {
  Electric = 'prąd',
  Water = 'woda'
}
