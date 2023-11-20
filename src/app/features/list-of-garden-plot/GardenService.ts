import {GardenPlot, PlotStatus} from "./garden-plot";
import {Counter} from "../counters/counter";
import {Profile} from "../Profile";
import {AbstractControl, ValidatorFn} from "@angular/forms";



export function findGardenByUserID(id: string | null, gardenPlots: GardenPlot[]): GardenPlot | null {
  let garden: GardenPlot;
  for (garden of gardenPlots) {
    if (garden.leaseholderID === id) {
      return garden
    }
  }
  return null
}

export function findGardenByID(id: string | null, gardenPlots: GardenPlot[]): GardenPlot | null {
  let garden: GardenPlot;
  for (garden of gardenPlots) {
    if (garden.gardenPlotID === id) {
      return garden
    }
  }
  return null
}

export function getMatchingSectorsWithCounter(counters: Counter[], gardenPlots: GardenPlot[]): string[] {
  // @ts-ignore
  const gardenPlotIdsWithCounters = new Set<string>(counters.map((counter) => counter.gardenPlotID));

  const availableGardenPlots = gardenPlots.filter((gardenPlot) => {
    return !gardenPlotIdsWithCounters.has(gardenPlot.gardenPlotID);
  });

  const sectors = availableGardenPlots.map((gardenPlot) => gardenPlot.sector);
  // @ts-ignore
  const uniqueSectorsSet = new Set<string>(sectors);
  const uniqueSectorsArray = Array.from(uniqueSectorsSet);
  uniqueSectorsArray.sort();

  return uniqueSectorsArray;
}

export function getMatchingAvenuesWithCounter(counters: Counter[], gardenPlots: GardenPlot[], sector: string | null): string[] {
  // @ts-ignore
  const gardenPlotIdsWithCounters = new Set<string>(counters.map((counter) => counter.gardenPlotID));

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


export function getMatchingNumbersWithCounter(counters: Counter[], gardenPlots: GardenPlot[], sector: string | null, avenue: string | null): number[] {
  // @ts-ignore
  const gardenPlotIdsWithCounters = new Set<string>(counters.map((counter) => counter.gardenPlotID));

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


export function findGardenPlotIdByAddress(sector: string | null, avenue: string | null, number: number | null, gardenPlots: GardenPlot[]): string | null {
  const matchingGardenPlot = gardenPlots.find((gardenPlot) =>
    gardenPlot.sector === sector && gardenPlot.avenue === avenue && gardenPlot.number === number
  );
  return matchingGardenPlot ? matchingGardenPlot.gardenPlotID : null;
}

export function uniqueLeaseholderIDValidator(gardenPlots: GardenPlot[], profiles: Profile[], showCurrentLeaseHolder: boolean, currentLeaseHolderID?: string | null): ValidatorFn {
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

    const isUsed = gardenPlots.some((plot) => plot.leaseholderID === selectedProfile.profileId);
    const isCurrent = (showCurrentLeaseHolder && currentLeaseHolderID === selectedProfile.profileId)

    if (isUsed && !isCurrent) {
      return {nonUniqueLeaseholderID: true};
    }
    return null;
  };
}

export function uniqueGardenValidator(sector: string, avenue: string, gardenPlots: GardenPlot[], showCurrenGardenPlot: boolean, currentLeaseHolderID?: string | null): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const gardenPlotNumber = control.value;

    if (!gardenPlotNumber) {
      return null;
    }

    const selectedGardenPlotId = findGardenPlotIdByAddress(sector, avenue, gardenPlotNumber, gardenPlots)
    if (!selectedGardenPlotId) {
      return null
    }

    const isCurrent = (showCurrenGardenPlot && currentLeaseHolderID === selectedGardenPlotId)

    if (!isCurrent)
      return {nonUniqueGarden: true};
    return null;
  };
}

export function findProfileEmailByID(IdToFind: string | null, profiles: Profile[]): string | null {
  const foundProfile = profiles.find((profile) => profile.profileId === IdToFind);
  return foundProfile ? foundProfile.email : null;
}



