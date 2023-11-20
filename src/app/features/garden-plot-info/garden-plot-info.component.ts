import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {gardenPlots} from "../list-of-garden-plot/GardenService";
import {GardenPlotInfoService} from "./garden-plot-info.service";
import {GardenPlotInfo, GardenPlotInfoFee, IndividualPaymentGardenPlot, MediaIndividualFee} from "./gardenPlotInfo";
import {MatTableDataSource} from "@angular/material/table";
import {Fee, IndividualPayment} from "../payments/payments";
import {Payment} from "../list-of-garden-plot/garden-plot-details/PaymentList";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-garden-plot-info',
  templateUrl: './garden-plot-info.component.html',
  styleUrls: ['./garden-plot-info.component.scss']
})
export class GardenPlotInfoComponent implements  AfterViewInit{
  gardenPlotInfo: GardenPlotInfo

  displayedColumns1: string[] = ['name', 'mediaConsumption', 'value'];
  displayedColumns2: string[] = ['name', 'type', 'value', 'sum'];
  displayedColumns3: string[] = ['name', 'value'];

  // @ts-ignore
  mediaIndividual: MatTableDataSource<MediaIndividualFee>;
  // @ts-ignore
  dataLeaseFees: MatTableDataSource<GardenPlotInfoFee>;
  // @ts-ignore
  dataUtilityFees: MatTableDataSource<GardenPlotInfoFee>;
  // @ts-ignore
  dataAdditionalFees: MatTableDataSource<GardenPlotInfoFee>;
  // @ts-ignore
  individualFees: MatTableDataSource<IndividualPaymentGardenPlot>;

  constructor(private gardenPlotInfoService: GardenPlotInfoService) {
    this.gardenPlotInfo = gardenPlotInfoService.getGardenPlotInfo()
    this.setMatTableDataSources()

  }

  setMatTableDataSources() {
    this.mediaIndividual = new MatTableDataSource(this.gardenPlotInfo.mediaIndividual);
    this.dataLeaseFees = new MatTableDataSource(this.gardenPlotInfo.leaseFees);
    this.dataUtilityFees = new MatTableDataSource(this.gardenPlotInfo.utilityFees);
    this.dataAdditionalFees = new MatTableDataSource(this.gardenPlotInfo.additionalFees);
    this.individualFees = new MatTableDataSource(this.gardenPlotInfo.individualFees);
  }

  @ViewChild('firstTableSort') public firstTableSort: MatSort | undefined;
  @ViewChild('secondTableSort') public secondTableSort: MatSort | undefined;
  @ViewChild('thirdTableSort') public thirdTableSort: MatSort | undefined;
  @ViewChild('fourthTableSort') public fourthTableSort: MatSort | undefined;
  @ViewChild('fifthTableSort') public fifthTableSort: MatSort | undefined;

  ngAfterViewInit() {
    // @ts-ignore
    this.mediaIndividual.sort = this.firstTableSort;
    // @ts-ignore
    this.dataUtilityFees.sort = this.secondTableSort;
    // @ts-ignore
    this.dataLeaseFees.sort = this.thirdTableSort;
    // @ts-ignore
    this.dataAdditionalFees.sort = this.fourthTableSort
    // @ts-ignore
    this.individualFees.sort = this.fifthTableSort
  }
}
