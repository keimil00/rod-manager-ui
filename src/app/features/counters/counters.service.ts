import {Injectable} from '@angular/core';
import {Counter, CounterType} from "./counter";

@Injectable({
    providedIn: 'root'
})
export class CountersService {
    private counters: Counter[] = [
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

    constructor() {
    }

    getAllCounters() {
        return this.counters
    }

    addCounter(counter: Counter) {
        this.counters.push(counter)
    }

    updateMeasurement(counterID: string, newMeasurement: number) {
        const foundCounterIndex = this.counters.findIndex(counter => counter.id === counterID);

        if (foundCounterIndex !== -1) {
            this.counters[foundCounterIndex].measurement = newMeasurement;
        }
    }
}
