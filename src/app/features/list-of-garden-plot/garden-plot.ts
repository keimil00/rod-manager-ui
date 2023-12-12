export interface GardenPlot {
  gardenPlotID: number;
  sector: string | null;
  avenue: string | null;
  number: number;
  area: number | null;
  leaseholderID: number | null;
  exleaseholderID: number | null;
  gardenStatus: PlotStatus;
}

export interface GardenPlotWithLeaseholder {
  gardenPlotID: number;
  sector: string | null;
  avenue: string | null;
  number: number;
  area: number | null;
  leaseholderID: number | null;
  exleaseholderID: number | null;
  leaseholder: string | number | null;
  gardenStatus: PlotStatus;
}

export interface GardenPlotExternal {
  id: number;
  sector: string | null;
  avenue: string | null;
  number: number;
  area: number | null;
  leaseholderID: LeaseholderExternal | null;
  last_leaseholder: LeaseholderExternal | null;
  status: PlotStatus2;
}

export interface LeaseholderExternal {
  first_name: string;
  last_name: string;
  id: number;
}

export enum PlotStatus {
  Available = 'dostępna',
  Unavailable = 'niedostępna'
}

export enum PlotStatus2 {
  Available = 'dostepna',
  Unavailable = 'niedostepna'
}
