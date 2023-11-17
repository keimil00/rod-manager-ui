import {GardenPlot, PlotStatus} from "./garden-plot";
import {Counter} from "../counters/counter";
import {Profile} from "../Profile";
import {AbstractControl, ValidatorFn} from "@angular/forms";

export function updateLeaseholderID(targetID: string | null | undefined, newLeaseholderID: string | null) {
  //to zastapi push
  for (let garden of gardenPlots) {
    if (garden.gardenPlotID === targetID) {
      garden.leaseholderID = newLeaseholderID
    }
  }
}

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

export function getMatchingSectors(counters: Counter[], gardenPlots: GardenPlot[]): string[] {
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

export function getMatchingAvenues(counters: Counter[], gardenPlots: GardenPlot[], sector: string | null): string[] {
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


export function getMatchingNumbers(counters: Counter[], gardenPlots: GardenPlot[], sector: string | null, avenue: string | null): number[] {
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

export function getSectors(value: string, gardenPlots: GardenPlot[]): string[] {
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

export function getAvenues(value: string, sector: string | null, gardenPlots: GardenPlot[]): string[] {
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


export function findGardenPlotIdByAddress(sector: string | null, avenue: string | null, number: number | null, gardenPlots: GardenPlot[]): string | null {
  const matchingGardenPlot = gardenPlots.find((gardenPlot) =>
    gardenPlot.sector === sector && gardenPlot.avenue === avenue && gardenPlot.number === number
  );
  return matchingGardenPlot ? matchingGardenPlot.gardenPlotID : null;
}

export function uniqueLeaseholderIDValidator(gardenPlots: GardenPlot[], profiles: Profile[], showCurrentLeaseHolder: boolean, currentLeaseHolderID?: string|null): ValidatorFn {
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
    const isCurrent = (showCurrentLeaseHolder && currentLeaseHolderID=== selectedProfile.profileId)

    if (isUsed && !isCurrent) {
      return {nonUniqueLeaseholderID: true};
    }
    return null;
  };
}

export function uniqueGardenValidator(sector: string, avenue: string, gardenPlots: GardenPlot[], showCurrenGardenPlot: boolean, currentLeaseHolderID?: string|null): ValidatorFn {
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

export let gardenPlots: GardenPlot[] = [
  {gardenPlotID: '1', sector: 'A', avenue: 'Avenue 1', number: 101, area: 500, leaseholderID: null, gardenStatus: PlotStatus.Available},
  {gardenPlotID: '2', sector: 'B', avenue: 'Avenue 2', number: 201, area: 600, leaseholderID: null, gardenStatus: PlotStatus.Available},
  {gardenPlotID: '3', sector: 'C', avenue: 'Avenue 3', number: 301, area: 750, leaseholderID: '1', gardenStatus: PlotStatus.Available},
  {gardenPlotID: '4', sector: 'D', avenue: 'Avenue 4', number: 401, area: 550, leaseholderID: null, gardenStatus: PlotStatus.Available},
  {
    gardenPlotID: '5',
    sector: 'E',
    avenue: 'Avenue 5',
    number: 501,
    area: 700,
    leaseholderID: '6',
    gardenStatus: PlotStatus.Unavailable
  },
  {
    gardenPlotID: '6',
    sector: 'F',
    avenue: 'Avenue 6',
    number: 601,
    area: 600,
    leaseholderID: '3',
    gardenStatus: PlotStatus.Unavailable
  },
  {gardenPlotID: '7', sector: 'G', avenue: 'Avenue 7', number: 701, area: 800, leaseholderID: '8', gardenStatus: PlotStatus.Available},
  {
    gardenPlotID: '8',
    sector: 'H',
    avenue: 'Avenue 8',
    number: 801,
    area: 900,
    leaseholderID: '10',
    gardenStatus: PlotStatus.Unavailable
  },
  {gardenPlotID: '9', sector: 'I', avenue: 'Avenue 9', number: 901, area: 450, leaseholderID: '11', gardenStatus: PlotStatus.Available},
  {
    gardenPlotID: '10',
    sector: 'J',
    avenue: 'Avenue 10',
    number: 1001,
    area: 600,
    leaseholderID: '16',
    gardenStatus: PlotStatus.Unavailable
  },
  {
    gardenPlotID: '11',
    sector: 'K',
    avenue: 'Avenue 11',
    number: 1101,
    area: 700,
    leaseholderID: '19',
    gardenStatus: PlotStatus.Unavailable
  },
  {
    gardenPlotID: '12',
    sector: 'L',
    avenue: 'Avenue 12',
    number: 1201,
    area: 800,
    leaseholderID: null,
    gardenStatus: PlotStatus.Available
  },
  {
    gardenPlotID: '13',
    sector: 'M',
    avenue: 'Avenue 13',
    number: 1301,
    area: 750,
    leaseholderID: '20',
    gardenStatus: PlotStatus.Unavailable
  },
  {
    gardenPlotID: '14',
    sector: 'N',
    avenue: 'Avenue 14',
    number: 1401,
    area: 600,
    leaseholderID: '14',
    gardenStatus: PlotStatus.Available
  },
  {
    gardenPlotID: '15',
    sector: 'O',
    avenue: 'Avenue 15',
    number: 1501,
    area: 850,
    leaseholderID: '17',
    gardenStatus: PlotStatus.Unavailable
  },
  {
    gardenPlotID: '16',
    sector: 'P',
    avenue: 'Avenue 16',
    number: 1601,
    area: 700,
    leaseholderID: null,
    gardenStatus: PlotStatus.Available
  },
  {
    gardenPlotID: '17',
    sector: 'Q',
    avenue: 'Avenue 17',
    number: 1701,
    area: 600,
    leaseholderID: '12',
    gardenStatus: PlotStatus.Unavailable
  },
  {
    gardenPlotID: '18',
    sector: 'R',
    avenue: 'Avenue 18',
    number: 1801,
    area: 750,
    leaseholderID: null,
    gardenStatus: PlotStatus.Available
  },
  {
    gardenPlotID: '19',
    sector: 'S',
    avenue: 'Avenue 19',
    number: 1901,
    area: 500,
    leaseholderID: '2',
    gardenStatus: PlotStatus.Unavailable
  },
  {
    gardenPlotID: '20',
    sector: 'T',
    avenue: 'Avenue 20',
    number: 2001,
    area: 600,
    leaseholderID: '4',
    gardenStatus: PlotStatus.Unavailable
  },
  {
    gardenPlotID: '21',
    sector: 'A',
    avenue: 'Avenue 1',
    number: 102,
    area: 600,
    leaseholderID: null,
    gardenStatus: PlotStatus.Unavailable
  },
];

