export interface GardenPlot {
  id: string;
  sector: string| null;
  avenue: string| null;
  number: number;
  area: number| null;
  leaseholderID: string| null;
  status: PlotStatus;
}

export enum PlotStatus {
  Available = 'dostępna',
  Unavailable = 'niedostępna'
}
