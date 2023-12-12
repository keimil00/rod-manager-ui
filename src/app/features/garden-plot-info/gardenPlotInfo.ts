import {IndividualPayment, CalculationType} from "../payments/payments";
import {MatTableDataSource} from "@angular/material/table";

export interface GardenPlotInfo {
  sector: string | null;
  avenue: string | null;
  number: number;
  area: number | null;
  leaseholder: string | null;
  value: number;
  date: Date;

  mediaIndividual: MediaIndividualFee[];
  leaseFees: GardenPlotInfoFee[];
  utilityFees: GardenPlotInfoFee[];
  additionalFees: GardenPlotInfoFee[];
  individualFees: IndividualPaymentGardenPlot [];
}

export interface GardenPlotInfoFee {
  name: string;
  type: CalculationType | null,
  value: number | null,
  sum: number
}

export interface MediaIndividualFee {
  name: string;
  mediaConsumption: string | null
  value: number,
}

export interface IndividualPaymentGardenPlot {
  name: string,
  value: number,
}

