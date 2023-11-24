export interface GardenPlot {
  gardenPlotID: number;
  sector: string| null;
  avenue: string| null;
  number: number;
  area: number| null;
  leaseholderID: number| null;
  gardenStatus: PlotStatus;
}

export interface GardenPlotBackend {
  gardenPlotID: number;
  sector: string| null;
  avenue: string| null;
  number: number;
  area: number| null;
  leaseholder: string|number| null;
  gardenStatus: PlotStatus;
}

export enum PlotStatus {
  Available = 'dostępna',
  Unavailable = 'niedostępna'
}
