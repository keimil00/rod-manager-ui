export interface GardenPlot {
  id: string;
  sector: string| null;
  avenue: string| null;
  number: number;
  area: number| null;
  leaseholderID: string| null;
  gardenStatus: PlotStatus;
}

export interface GardenPlotBackend {
  id: string;
  sector: string| null;
  avenue: string| null;
  number: number;
  area: number| null;
  leaseholder: string| null;
  gardenStatus: PlotStatus;
}

export enum PlotStatus {
  Available = 'dostępna',
  Unavailable = 'niedostępna'
}
