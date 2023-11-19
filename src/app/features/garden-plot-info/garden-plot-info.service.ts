import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlotStatus} from "../list-of-garden-plot/garden-plot";
import {GardenPlotInfo, GardenPlotInfoFee, IndividualPaymentGardenPlot, MediaIndividualFee} from "./gardenPlotInfo";
import {MatTableDataSource} from "@angular/material/table";
import {Fee, IndividualPayment, TypeOfFee} from "../payments/payments";

@Injectable({
    providedIn: 'root'
})
export class GardenPlotInfoService {

    private leaseFees: GardenPlotInfoFee[] = [
        {
            name: 'PZD',
            type: TypeOfFee.PerMeter,
            value: 0.12,
            sum: 200,
        },
        {
            name: 'Opłata ogrodowa',
            type: TypeOfFee.PerMeter,
            value: 0.61,
            sum: 200,
        },
        {
            name: 'Opłata Inwestycyjna',
            type: TypeOfFee.PerMeter,
            value: 0.5,
            sum: 200,
        },
        {
            name: 'Razem',
            type: null,
            value: null,
            sum: 600,
        }
    ];
    private utilityFees: GardenPlotInfoFee[] = [
        {
            name: 'Prąd',
            type: TypeOfFee.PerMeter,
            value: 0.12,
            sum: 200,
        },
        {
            name: 'Woda',
            type: TypeOfFee.PerMeter,
            value: 0.61,
            sum: 200,
        },
        {
            name: 'Razem',
            type: null,
            value: null,
            sum: 400,
        }
    ];
    private additionalFees: GardenPlotInfoFee[] = [
        {
            name: 'Koszenie trawy',
            type: TypeOfFee.PerGardenPlot,
            value: 70,
            sum: 200,
        },
        {
            name: 'Grabienie liści',
            type: TypeOfFee.PerGardenPlot,
            value: 40,
            sum: 200,
        },
        {
            name: 'Razem',
            type: null,
            value: null,
            sum: 400,
        }
    ];
    private individualFees: IndividualPaymentGardenPlot [] =
        [
            {
                name: 'Opłata za przekroczenie limitu wody',
                value: 40,
            },
            {
                name: 'Opłata za opiekę nad roślinami w czasie urlopu',
                value: 100,
            },
            {
                name: 'Razem',
                value: 140,
            },
        ]
    private mediaIndividuals: MediaIndividualFee[] =
        [
            {
                name: 'Prąd',
                mediaConsumption: '10 KW',
                value: 200
            },
            {
                name: 'Woda',
                mediaConsumption: '10 m³',
                value: 150
            },
            {
                name: 'Razem',
                mediaConsumption: null,
                value: 350
            },
        ]


    gardenPlotInfo: GardenPlotInfo = {
        sector: "A",
        avenue: "Avenure",
        number: 1,
        area: 60,
        leaseholder: "Jan Kowalski",
        value: 3000,
        date: new Date(2024, 2, 7),

        mediaIndividual: this.mediaIndividuals,
        leaseFees: this.leaseFees,
        utilityFees: this.utilityFees,
        additionalFees: this.additionalFees,
        individualFees: this.individualFees
    }

    constructor(private httpClient: HttpClient) {
    }

    getGardenPlotInfo(): GardenPlotInfo {
        return this.gardenPlotInfo
    }
}
