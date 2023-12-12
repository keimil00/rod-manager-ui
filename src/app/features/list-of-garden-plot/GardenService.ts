import {GardenPlot} from "./garden-plot";
import {Counter, CounterType} from "../counters/counter";
import {Profile} from "../Profile";
import {AbstractControl, ValidatorFn} from "@angular/forms";


export function findGardenByUserID(id: number | null|undefined, gardenPlots: GardenPlot[]): GardenPlot | null {
    let garden: GardenPlot;
    for (garden of gardenPlots) {
        if (garden.leaseholderID === id) {
            return garden
        }
    }
    return null
}

export function findGardenByID(id: number | null, gardenPlots: GardenPlot[]): GardenPlot | null {
    let garden: GardenPlot;
    for (garden of gardenPlots) {
        if (garden.gardenPlotID === id) {
            return garden
        }
    }
    return null
}

export function getMatchingSectorsWithCounter(
    counters: Counter[],
    gardenPlots: GardenPlot[],
    isWater: boolean
): string[] {
    const filteredCounters = isWater
        ? counters.filter(counter => counter.type === CounterType.Water)
        : counters.filter(counter => counter.type === CounterType.Electric);

    // @ts-ignore
    const gardenPlotIdsWithCounters = new Set<number>(filteredCounters.map(counter => counter.gardenPlotID));

    const availableGardenPlots = gardenPlots.filter(gardenPlot => {
        return !gardenPlotIdsWithCounters.has(gardenPlot.gardenPlotID);
    });

    const sectors = availableGardenPlots.map(gardenPlot => gardenPlot.sector);
    // @ts-ignore
    const uniqueSectorsSet = new Set<string>(sectors);
    const uniqueSectorsArray = Array.from(uniqueSectorsSet);
    uniqueSectorsArray.sort();

    return uniqueSectorsArray;
}


export function getMatchingAvenuesWithCounter(counters: Counter[], gardenPlots: GardenPlot[], sector: string | null, isWater: boolean): string[] {
    const filteredCounters = isWater
        ? counters.filter(counter => counter.type === CounterType.Water)
        : counters.filter(counter => counter.type === CounterType.Electric);
    // @ts-ignore
    const gardenPlotIdsWithCounters = new Set<number>(filteredCounters.map((counter) => counter.gardenPlotID));

    const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
        return (
            !gardenPlotIdsWithCounters.has(gardenPlot.gardenPlotID) &&
            (sector ? gardenPlot.sector === sector : true)
        );
    });

    const avenues = availableGardenPlots.map((gardenPlot) => gardenPlot.avenue);
    // @ts-ignore
    const uniqueAvenuesSet = new Set<string>(avenues);
    const uniqueAvenuesArray = Array.from(uniqueAvenuesSet);
    uniqueAvenuesArray.sort();

    return uniqueAvenuesArray;
}


export function getMatchingNumbersWithCounter(counters: Counter[], gardenPlots: GardenPlot[], sector: string | null, avenue: string | null, isWater: boolean): number[] {
    const filteredCounters = isWater
        ? counters.filter(counter => counter.type === CounterType.Water)
        : counters.filter(counter => counter.type === CounterType.Electric);
    // @ts-ignore
    const gardenPlotIdsWithCounters = new Set<number>(filteredCounters.map((counter) => counter.gardenPlotID));

    const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
        return (
            !gardenPlotIdsWithCounters.has(gardenPlot.gardenPlotID) &&
            (sector ? gardenPlot.sector === sector : true) &&
            (avenue ? gardenPlot.avenue === avenue : true)
        );
    });

    const numbers = availableGardenPlots.map((gardenPlot) => gardenPlot.number);
    const uniqueNumbersSet = new Set<number>(numbers);
    const uniqueNumbersArray = Array.from(uniqueNumbersSet);
    uniqueNumbersArray.sort((a, b) => a - b);

    return uniqueNumbersArray;
}

export function getMatchingSectors(value: string, gardenPlots: GardenPlot[]): string[] {
    const lowerCaseValue = value.toLowerCase();

    const uniqueSectorsSet = new Set<string>();
    const seenSectors = new Set<string>();

    gardenPlots.forEach((gardenPlot) => {
        const sector = gardenPlot.sector;

        // @ts-ignore
        if (!seenSectors.has(<string>sector) && sector.toLowerCase().includes(lowerCaseValue)) {
            if (sector != null) {
                uniqueSectorsSet.add(sector);
            }
            if (sector != null) {
                seenSectors.add(sector);
            }
        }
    });

    const uniqueSectorsArray = Array.from(uniqueSectorsSet);
    uniqueSectorsArray.sort();

    return uniqueSectorsArray;
}

export function getMatchingAvenues(value: string, sector: string | null, gardenPlots: GardenPlot[]): string[] {
    const lowerCaseValue = value.toLowerCase();

    const uniqueAvenuesSet = new Set<string>();
    const seenAvenues = new Set<string>();

    gardenPlots.forEach((gardenPlot) => {
        const avenue = gardenPlot.avenue;

        if (
            sector &&
            gardenPlot.sector === sector &&
            !seenAvenues.has(<string>avenue) &&
            // @ts-ignore
            avenue.toLowerCase().includes(lowerCaseValue)
        ) {
            if (avenue != null) {
                uniqueAvenuesSet.add(avenue);
            }
            if (avenue != null) {
                seenAvenues.add(avenue);
            }
        }
    });

    const uniqueAvenuesArray = Array.from(uniqueAvenuesSet);
    uniqueAvenuesArray.sort();

    return uniqueAvenuesArray;
}

export function getSectors(gardenPlots: GardenPlot[]): string[] {
    const uniqueSectorsSet = new Set<string>();
    const seenSectors = new Set<string>();

    gardenPlots.forEach((gardenPlot) => {
        const sector = gardenPlot.sector;

        // @ts-ignore
        if (gardenPlot.leaseholderID && !seenSectors.has(<string>sector)) {
            if (sector != null) {
                uniqueSectorsSet.add(sector);
            }
            if (sector != null) {
                seenSectors.add(sector);
            }
        }
    });

    const uniqueSectorsArray = Array.from(uniqueSectorsSet);
    uniqueSectorsArray.sort();

    return uniqueSectorsArray;
}

export function getAvenues(sector: string | null, gardenPlots: GardenPlot[]): string[] {
    const uniqueAvenuesSet = new Set<string>();
    const seenAvenues = new Set<string>();

    gardenPlots.forEach((gardenPlot) => {
        const avenue = gardenPlot.avenue;

        if (
            sector &&
            gardenPlot.sector === sector && gardenPlot.leaseholderID &&
            !seenAvenues.has(<string>avenue)
        ) {
            if (avenue != null) {
                uniqueAvenuesSet.add(avenue);
            }
            if (avenue != null) {
                seenAvenues.add(avenue);
            }
        }
    });

    const uniqueAvenuesArray = Array.from(uniqueAvenuesSet);
    uniqueAvenuesArray.sort();

    return uniqueAvenuesArray;
}

export function getNumbers(sector: string | null, avenue: string | null, gardenPlots: GardenPlot[]): number[] {

    const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
        return (
            (sector ? gardenPlot.sector === sector : true) && gardenPlot.leaseholderID &&
            (avenue ? gardenPlot.avenue === avenue : true)
        );
    });
    const numbers = availableGardenPlots.map((gardenPlot) => gardenPlot.number);
    numbers.sort((a, b) => a - b);

    return numbers;
}


export function findGardenPlotIdByAddress(sector: string | null, avenue: string | null, number: number | null, gardenPlots: GardenPlot[]): number| null {
    const matchingGardenPlot = gardenPlots.find((gardenPlot) =>
        gardenPlot.sector === sector && gardenPlot.avenue === avenue && gardenPlot.number === number
    );
    return matchingGardenPlot ? matchingGardenPlot.gardenPlotID : null;
}

export function uniqueLeaseholderIDValidator(gardenPlots: GardenPlot[], profiles: Profile[], showCurrentLeaseHolder: boolean, currentLeaseHolderID?: number | null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const leaseholderEmail = control.value;

        if (!leaseholderEmail) {
            return null;
        }

        if (leaseholderEmail === 'brak') {
            return null;
        }

        const selectedProfile = profiles.find((profile) => profile.email === leaseholderEmail);

        if (!selectedProfile) {
            return null;
        }

        const isUsed = gardenPlots.some((plot) => plot.leaseholderID === selectedProfile.id);
        const isCurrent = (showCurrentLeaseHolder && currentLeaseHolderID === selectedProfile.id)

        if (isUsed && !isCurrent) {
            return {nonUniqueLeaseholderID: true};
        }
        return null;
    };
}

export function uniqueGardenValidator(sector: string, avenue: string, gardenPlots: GardenPlot[], showCurrenGardenPlot: boolean, currentGardenPlotID?: number | null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const gardenPlotNumber = control.value;

        if (!gardenPlotNumber) {
            return null;
        }

        const selectedGardenPlotId = findGardenPlotIdByAddress(sector, avenue, gardenPlotNumber, gardenPlots)
        if (!selectedGardenPlotId) {
            return null
        }

        const isCurrent = (showCurrenGardenPlot && currentGardenPlotID === selectedGardenPlotId)

        if (!isCurrent)
            return {nonUniqueGarden: true};
        return null;
    };
}

export function findLeaseholderByPLotID(garden: GardenPlot, profiles: Profile[], gardens: GardenPlot[]): Profile | null {
  const foundProfile = profiles.find((profile) => profile.id === garden?.leaseholderID);
  return foundProfile ? foundProfile : null;
}

export function findExLeaseholderByPLotID(garden: GardenPlot, profiles: Profile[],gardens: GardenPlot[]): Profile | null {
  const foundProfile = profiles.find((profile) => profile.id === garden.exleaseholderID);
  return foundProfile ? foundProfile : null;
}




