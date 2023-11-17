export interface GardenPlot {
  gardenPlotID: string;
  sector: string| null;
  avenue: string| null;
  number: number;
  area: number| null;
  leaseholderID: string| null;
  gardenStatus: PlotStatus;
}

export interface GardenPlotBackend {
  gardenPlotID: string;
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
