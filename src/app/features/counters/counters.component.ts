import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Counter, CounterType} from "./counter";
import {MeasurementDialogComponent} from "./measurement-dialog/measurement-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddCounterDialogComponent} from "./add-counter-dialog/add-counter-dialog.component";
import {CountersService} from "./counters.service";
import {VotingItem} from "../votings/voting-item.model";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-counters',
    templateUrl: './counters.component.html',
    styleUrls: ['./counters.component.scss']
})
export class CountersComponent {
    displayedColumns: string[] = ['addressC', 'id', 'gardenPlotID', 'measurement', 'add'];
    showWater: boolean = true;

    // @ts-ignore
    dataSourceElectric: MatTableDataSource<Counter>
    // @ts-ignore
    dataSourceWater: MatTableDataSource<Counter>
    // @ts-ignore
    counters: Counter[]

    constructor(private dialog: MatDialog, private countersService: CountersService,private spinner: NgxSpinnerService) {
        this.spinner.show()
        this.setData()
    }

    setData() {
        this.initData()
    }

    initData() {
        this.countersService.getAllCounters().subscribe((votcounters1: Counter[]) => {
            // @ts-ignore
            const dataSourceWater: MatTableDataSource<Counter> = new MatTableDataSource([]);
            // @ts-ignore
            const dataSourceElectric: MatTableDataSource<Counter> = new MatTableDataSource([]);
            this.counters = votcounters1;
            this.sortCounters()

            this.counters.forEach((counter) => {
                if (counter.type === CounterType.Water) {
                    dataSourceWater.data.push(counter);
                } else if (counter.type === CounterType.Electric) {
                    dataSourceElectric.data.push(counter);
                }
            });
            this.dataSourceWater = dataSourceWater;
            this.dataSourceElectric = dataSourceElectric;
            this.spinner.hide()
        });
    }

    sortCounters() {
        this.counters.sort((a, b) => {
            if (a.gardenPlotID === null && b.gardenPlotID !== null) {
                return -1;
            }
            if (a.gardenPlotID !== null && b.gardenPlotID === null) {
                return 1;
            }

            if (a.gardenPlotID !== null && b.gardenPlotID !== null) {
                // @ts-ignore
                const aParts = a.addressC.split(', ');
                // @ts-ignore
                const bParts = b.addressC.split(', ');

                for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
                    const comparison = aParts[i].localeCompare(bParts[i]);
                    if (comparison !== 0) {
                        return comparison;
                    }
                }
                return 0;
            } else {
                // @ts-ignore
                return a.addressC.localeCompare(b.addressC);
            }
        });
    }

    changeWater() {
        this.showWater = !this.showWater
    }

    openMeasurementDialog(counter: Counter) {
        const dialogRef = this.dialog.open(MeasurementDialogComponent, {
            width: '400px',
            data: {measurement: counter.measurement}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                //TODO zmienić stan konta użytkownika
                this.countersService.updateMeasurement(counter.id, result)
            }
        });
    }

    openAddCounterDialog() {
        const dialogRef = this.dialog.open(AddCounterDialogComponent, {
            width: '400px',
            data: {counters: this.counters, isShowWater: this.showWater}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.countersService.addCounter(result)
                this.setData()
            }
        });
    }
}




