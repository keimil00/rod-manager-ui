export interface Counter {
  id: string;
  addressC: string| null;
  measurement: number;
  type: CounterType;
  gardenPlotID: number| null;
}

export enum CounterType {
  Electric = 'prąd',
  Water = 'woda'
}
