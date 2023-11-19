import {Component} from '@angular/core';
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {gardenPlots} from "../list-of-garden-plot/GardenService";
import {GardenPlotInfoService} from "./garden-plot-info.service";
import {GardenPlotInfo, GardenPlotInfoFee, IndividualPaymentGardenPlot, MediaIndividualFee} from "./gardenPlotInfo";
import {MatTableDataSource} from "@angular/material/table";
import {Fee, IndividualPayment} from "../payments/payments";

@Component({
    selector: 'app-garden-plot-info',
    templateUrl: './garden-plot-info.component.html',
    styleUrls: ['./garden-plot-info.component.scss']
})
export class GardenPlotInfoComponent {
    gardenPlotInfo: GardenPlotInfo

    displayedColumns1: string[] = ['name', 'type', 'value'];
    displayedColumns2: string[] = ['name', 'type', 'value','sum'];
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
}
