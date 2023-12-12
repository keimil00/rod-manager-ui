import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {GardenPlotInfoService} from "./garden-plot-info.service";
import {GardenPlotInfo, GardenPlotInfoFee, IndividualPaymentGardenPlot, MediaIndividualFee} from "./gardenPlotInfo";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-garden-plot-info',
  templateUrl: './garden-plot-info.component.html',
  styleUrls: ['./garden-plot-info.component.scss']
})
export class GardenPlotInfoComponent implements AfterViewInit {
  // @ts-ignore
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

  constructor(
    private gardenPlotInfoService: GardenPlotInfoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.spinner.show()
    gardenPlotInfoService.getGardenPlotInfo().subscribe({
      next: (data: GardenPlotInfo) => {
        this.gardenPlotInfo = data;
        this.setMatTableDataSources()
      }, error: err => {
        this.spinner.hide()
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      }
    });
  }

  setMatTableDataSources() {
    this.mediaIndividual = new MatTableDataSource(this.gardenPlotInfo.mediaIndividual);
    this.dataLeaseFees = new MatTableDataSource(this.gardenPlotInfo.leaseFees);
    this.dataUtilityFees = new MatTableDataSource(this.gardenPlotInfo.utilityFees);
    this.dataAdditionalFees = new MatTableDataSource(this.gardenPlotInfo.additionalFees);
    this.individualFees = new MatTableDataSource(this.gardenPlotInfo.individualFees);
    this.spinner.hide()
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
