import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Counter, CounterType} from "./counter";
import {gardenPlots} from "../list-of-garden-plot/list-of-garden-plot.component";
import {GardenPlot, PlotStatus} from "../list-of-garden-plot/garden-plot";
import {MeasurementDialogComponent} from "./measurement-dialog/measurement-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddCounterDialogComponent} from "./add-counter-dialog/add-counter-dialog.component";

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss']
})
export class CountersComponent {
  displayedColumns: string[] = ['addressC', 'id','gardenPlotID', 'measurement', 'add'];
  showWater: boolean = true;

  dataSourceElectric: MatTableDataSource<Counter>;
  dataSourceWater: MatTableDataSource<Counter>;

  constructor(private dialog: MatDialog) {
    // @ts-ignore
    const dataSourceWater: MatTableDataSource<Counter> = new MatTableDataSource([]);
    // @ts-ignore
    const dataSourceElectric: MatTableDataSource<Counter> = new MatTableDataSource([]);

    counters.forEach((counter) => {
      if (counter.type === CounterType.Water) {
        dataSourceWater.data.push(counter);
      } else if (counter.type === CounterType.Electric) {
        dataSourceElectric.data.push(counter);
      }
    });

    this.dataSourceWater = dataSourceWater;
    this.dataSourceElectric = dataSourceElectric;
  }

  changeWater(){
    this.showWater = !this.showWater
  }

  openMeasurementDialog(counter: Counter) {
    const dialogRef = this.dialog.open(MeasurementDialogComponent, {
      width: '400px',
      data: { measurement: counter.measurement }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        //TODO
        counter.measurement = result;
      }
    });
  }

  openAddCounterDialog() {
    const dialogRef = this.dialog.open(AddCounterDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //TODO
        if (result.type === CounterType.Water) {
          this.dataSourceWater.data.push(result);
          this.dataSourceWater = new MatTableDataSource([...this.dataSourceWater.data]);
        } else if (result.type === CounterType.Electric) {
          this.dataSourceElectric.data.push(result);
          this.dataSourceElectric = new MatTableDataSource([...this.dataSourceElectric.data]);
        }
      }
    });
  }

}

export let counters: Counter[] = [
  {
    id: 'counter-1',
    addressC: 'Sektor A, al. Borówkowa 1',
    measurement: 42,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-1',
  },
  {
    id: 'counter-2',
    addressC: 'Sektor B, ul. Jagodowa 2',
    measurement: 17,
    type: CounterType.Water,
    gardenPlotID: 'GardenPlot-2',
  },
  {
    id: 'counter-3',
    addressC: 'Sektor C, ul. Malinowa 3',
    measurement: 69,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-3',
  },
  {
    id: 'counter-4',
    addressC: 'ogólny',
    measurement: 33,
    type: CounterType.Water,
    gardenPlotID: null,
  },
  {
    id: 'counter-5',
    addressC: 'Sektor B, ul. Jagodowa 5',
    measurement: 91,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-5',
  },
  {
    id: 'counter-6',
    addressC: 'Sektor C, ul. Malinowa 6',
    measurement: 5,
    type: CounterType.Water,
    gardenPlotID: 'GardenPlot-6',
  },
  {
    id: 'counter-7',
    addressC: 'Sektor A, al. Borówkowa 7',
    measurement: 74,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-7',
  },
  {
    id: 'counter-8',
    addressC: 'parking',
    measurement: 26,
    type: CounterType.Water,
    gardenPlotID: null,
  },
  {
    id: 'counter-9',
    addressC: 'Sektor C, ul. Malinowa 9',
    measurement: 50,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-9',
  },
  {
    id: 'counter-10',
    addressC: 'Sektor A, al. Borówkowa 10',
    measurement: 84,
    type: CounterType.Water,
    gardenPlotID: 'GardenPlot-10',
  },
  {
    id: 'counter-11',
    addressC: 'Sektor B, ul. Jagodowa 11',
    measurement: 22,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-11',
  },
  {
    id: 'counter-12',
    addressC: 'Sektor C, ul. Malinowa 12',
    measurement: 68,
    type: CounterType.Water,
    gardenPlotID: 'GardenPlot-12',
  },
  {
    id: 'counter-13',
    addressC: 'Sektor A, al. Borówkowa 13',
    measurement: 39,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-13',
  },
  {
    id: 'counter-14',
    addressC: 'Sektor B, ul. Jagodowa 14',
    measurement: 13,
    type: CounterType.Water,
    gardenPlotID: 'GardenPlot-14',
  },
  {
    id: 'counter-15',
    addressC: 'Sektor C, ul. Malinowa 15',
    measurement: 58,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-15',
  },
  {
    id: 'counter-16',
    addressC: 'Sektor A, al. Borówkowa 16',
    measurement: 71,
    type: CounterType.Water,
    gardenPlotID: 'GardenPlot-16',
  },
  {
    id: 'counter-17',
    addressC: 'Sektor B, ul. Jagodowa 17',
    measurement: 9,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-17',
  },
  {
    id: 'counter-18',
    addressC: 'Sektor C, ul. Malinowa 18',
    measurement: 92,
    type: CounterType.Water,
    gardenPlotID: 'GardenPlot-18',
  },
  {
    id: 'counter-19',
    addressC: 'Sektor A, al. Borówkowa 19',
    measurement: 31,
    type: CounterType.Electric,
    gardenPlotID: 'GardenPlot-19',
  },
  {
    id: 'counter-20',
    addressC: 'Sektor B, ul. Jagodowa 20',
    measurement: 7,
    type: CounterType.Water,
    gardenPlotID: 'GardenPlot-20',
  },
];


