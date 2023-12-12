import {Injectable} from '@angular/core';
import {GardenPlot, GardenPlotExternal, GardenPlotWithLeaseholder, PlotStatus} from "./garden-plot";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {Page} from "../../shared/paginator/page.model";

@Injectable({
  providedIn: 'root'
})
export class BackendGardenService {

  // private gardenPlotsBackend: GardenPlotWithLeaseholder[] = [
  //   {
  //     gardenPlotID: 1,
  //     sector: 'A',
  //     avenue: 'Avenue 1',
  //     number: 101,
  //     area: 500,
  //     leaseholder: null,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 2,
  //     sector: 'B',
  //     avenue: 'Avenue 2',
  //     number: 201,
  //     area: 600,
  //     leaseholder: null,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 3,
  //     sector: 'C',
  //     avenue: 'Avenue 3',
  //     number: 301,
  //     area: 750,
  //     leaseholder: 'John Doe',
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 4,
  //     sector: 'D',
  //     avenue: 'Avenue 4',
  //     number: 401,
  //     area: 550,
  //     leaseholder: null,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 5,
  //     sector: 'E',
  //     avenue: 'Avenue 5',
  //     number: 501,
  //     area: 700,
  //     leaseholder: 'Linda Jones',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 6,
  //     sector: 'F',
  //     avenue: 'Avenue 6',
  //     number: 601,
  //     area: 600,
  //     leaseholder: 'David Johnson',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 7,
  //     sector: 'G',
  //     avenue: 'Avenue 7',
  //     number: 701,
  //     area: 800,
  //     leaseholder: 'Susan Wilson',
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 8,
  //     sector: 'H',
  //     avenue: 'Avenue 8',
  //     number: 801,
  //     area: 900,
  //     leaseholder: 'Karen Taylor',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 9,
  //     sector: 'I',
  //     avenue: 'Avenue 9',
  //     number: 901,
  //     area: 450,
  //     leaseholder: 'Richard Anderson',
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 10,
  //     sector: 'J',
  //     avenue: 'Avenue 10',
  //     number: 1001,
  //     area: 600,
  //     leaseholder: 'Karen Martin',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 11,
  //     sector: 'K',
  //     avenue: 'Avenue 11',
  //     number: 1101,
  //     area: 700,
  //     leaseholder: 'Michael Lewis',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 12,
  //     sector: 'L',
  //     avenue: 'Avenue 12',
  //     number: 1201,
  //     area: 800,
  //     leaseholder: null,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 13,
  //     sector: 'M',
  //     avenue: 'Avenue 13',
  //     number: 1301,
  //     area: 750,
  //     leaseholder: 'Susan Clark',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 14,
  //     sector: 'N',
  //     avenue: 'Avenue 14',
  //     number: 1401,
  //     area: 600,
  //     leaseholder: 'Susan Jackson',
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 15,
  //     sector: 'O',
  //     avenue: 'Avenue 15',
  //     number: 1501,
  //     area: 850,
  //     leaseholder: 'William Garcia',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 16,
  //     sector: 'P',
  //     avenue: 'Avenue 16',
  //     number: 1601,
  //     area: 700,
  //     leaseholder: null,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 17,
  //     sector: 'Q',
  //     avenue: 'Avenue 17',
  //     number: 1701,
  //     area: 600,
  //     leaseholder: 'Patricia White',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 18,
  //     sector: 'R',
  //     avenue: 'Avenue 18',
  //     number: 1801,
  //     area: 750,
  //     leaseholder: null,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 19,
  //     sector: 'S',
  //     avenue: 'Avenue 19',
  //     number: 1901,
  //     area: 500,
  //     leaseholder: 'Jane Smith',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 20,
  //     sector: 'T',
  //     avenue: 'Avenue 20',
  //     number: 2001,
  //     area: 600,
  //     leaseholder: 'Mary Williams',
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 21,
  //     sector: 'A',
  //     avenue: 'Avenue 1',
  //     number: 102,
  //     area: 600,
  //     leaseholder: null,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  // ];

  // private gardenPlots: GardenPlot[] = [
  //   {
  //     gardenPlotID: 1,
  //     sector: 'A',
  //     avenue: 'Avenue 1',
  //     number: 101,
  //     area: 500,
  //     leaseholderID: null,
  //     exleaseholderID: null,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 2,
  //     sector: 'B',
  //     avenue: 'Avenue 2',
  //     number: 201,
  //     area: 600,
  //     leaseholderID: null,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 3,
  //     sector: 'C',
  //     avenue: 'Avenue 3',
  //     number: 301,
  //     area: 750,
  //     leaseholderID: 1,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 4,
  //     sector: 'D',
  //     avenue: 'Avenue 4',
  //     number: 401,
  //     area: 550,
  //     leaseholderID: null,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 5,
  //     sector: 'E',
  //     avenue: 'Avenue 5',
  //     number: 501,
  //     area: 700,
  //     leaseholderID: 6,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 6,
  //     sector: 'F',
  //     avenue: 'Avenue 6',
  //     number: 601,
  //     area: 600,
  //     leaseholderID: 3,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 7,
  //     sector: 'G',
  //     avenue: 'Avenue 7',
  //     number: 701,
  //     area: 800,
  //     leaseholderID: 8,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 8,
  //     sector: 'H',
  //     avenue: 'Avenue 8',
  //     number: 801,
  //     area: 900,
  //     leaseholderID: 10,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 9,
  //     sector: 'I',
  //     avenue: 'Avenue 9',
  //     number: 901,
  //     area: 450,
  //     leaseholderID: 11,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 10,
  //     sector: 'J',
  //     avenue: 'Avenue 10',
  //     number: 1001,
  //     area: 600,
  //     leaseholderID: 16,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 11,
  //     sector: 'K',
  //     avenue: 'Avenue 11',
  //     number: 1101,
  //     area: 700,
  //     leaseholderID: 19,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 12,
  //     sector: 'L',
  //     avenue: 'Avenue 12',
  //     number: 1201,
  //     area: 800,
  //     leaseholderID: null,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 13,
  //     sector: 'M',
  //     avenue: 'Avenue 13',
  //     number: 1301,
  //     area: 750,
  //     leaseholderID: 20,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 14,
  //     sector: 'N',
  //     avenue: 'Avenue 14',
  //     number: 1401,
  //     area: 600,
  //     leaseholderID: 14,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 15,
  //     sector: 'O',
  //     avenue: 'Avenue 15',
  //     number: 1501,
  //     area: 850,
  //     leaseholderID: 17,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 16,
  //     sector: 'P',
  //     avenue: 'Avenue 16',
  //     number: 1601,
  //     area: 700,
  //     leaseholderID: null,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 17,
  //     sector: 'Q',
  //     avenue: 'Avenue 17',
  //     number: 1701,
  //     area: 600,
  //     leaseholderID: 12,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 18,
  //     sector: 'R',
  //     avenue: 'Avenue 18',
  //     number: 1801,
  //     area: 750,
  //     leaseholderID: null,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Available
  //   },
  //   {
  //     gardenPlotID: 19,
  //     sector: 'S',
  //     avenue: 'Avenue 19',
  //     number: 1901,
  //     area: 500,
  //     leaseholderID: 2,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 20,
  //     sector: 'T',
  //     avenue: 'Avenue 20',
  //     number: 2001,
  //     area: 600,
  //     leaseholderID: 4,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  //   {
  //     gardenPlotID: 21,
  //     sector: 'A',
  //     avenue: 'Avenue 1',
  //     number: 102,
  //     area: 600,
  //     leaseholderID: null,
  //     exleaseholderID: 10,
  //     gardenStatus: PlotStatus.Unavailable
  //   },
  // ];

  constructor(private httpClient: HttpClient, private listOfUsersService: ListOfUsersService) {
  }

  private readonly gardensURL = 'api/gardens/'

  getGardenPlots(index: number, size: number): Observable<Page<GardenPlotWithLeaseholder>> {
    const url = `${this.gardensURL}?page=${index}&page_size=${size}`;

    return this.httpClient.get<Page<GardenPlotExternal>>(url).pipe(
      map((page: Page<GardenPlotExternal>) => {
          const newPage: Page<GardenPlotWithLeaseholder> = {
            results: page.results.map((garden: GardenPlotExternal) => {
              let leaseholderID: number | null = null
              let exleaseholderID: number | null = null
              if (garden.leaseholderID) {
                leaseholderID = garden.leaseholderID.id
              }
              if (garden.last_leaseholder) {
                exleaseholderID = garden.last_leaseholder.id
              }
              let status: PlotStatus | string
              if (garden.status === 'dostepna') {
                status = PlotStatus.Available
              } else if (garden.status === 'niedostepna') {
                status = PlotStatus.Unavailable
              } else status = garden.status

              let leaseholder: string | null

              if(garden.leaseholderID === null){
                leaseholder = null
              }
              else {
                leaseholder = garden.leaseholderID.first_name + ' ' + garden.leaseholderID.last_name
              }

              const gardenPlot: GardenPlotWithLeaseholder = {
                gardenPlotID: garden.id,
                sector: garden.sector,
                avenue: garden.avenue,
                number: garden.number,
                area: garden.area,
                leaseholder: leaseholder,
                // @ts-ignore
                gardenStatus: status,
                leaseholderID: leaseholderID,
                exleaseholderID: exleaseholderID
              }
              return gardenPlot;
            }),
            count: page.count
          };
          return newPage;
        }
      )
    )
  }

  getAllGardenPlots(): Observable<GardenPlot[]> {

    const url = `${this.gardensURL}?page=${1}&page_size=${1000000}`;

    return this.httpClient.get<Page<GardenPlotExternal>>(url).pipe(
      map((page: Page<GardenPlotExternal>) => {

          return page.results.map((garden: GardenPlotExternal) => {
              let leaseholderID: number | null = null
              let exleaseholderID: number | null = null
              if (garden.leaseholderID) {
                leaseholderID = garden.leaseholderID.id
              }
              if (garden.last_leaseholder) {
                exleaseholderID = garden.last_leaseholder.id
              }
              let status: PlotStatus | string
              if (garden.status === 'dostepna') {
                status = PlotStatus.Available
              } else if (garden.status === 'niedostepna') {
                status = PlotStatus.Unavailable
              } else status = garden.status

              const gardenPlot: GardenPlot = {
                gardenPlotID: garden.id,
                sector: garden.sector,
                avenue: garden.avenue,
                number: garden.number,
                area: garden.area,
                // @ts-ignore
                gardenStatus: status,
                leaseholderID: leaseholderID,
                exleaseholderID: exleaseholderID
              }
              return gardenPlot;
            }
          );
        }
      )
    )
  }

  editGarden(gardenId: number, newGarden: any): Observable<any> {

    let leasloderID: number | string
    if(newGarden.leaseholderID === null){
      leasloderID = 'None'
    }
    else {leasloderID = newGarden.leaseholderID}

    let newGarden2: {
      area: number;
      gardenStatus: PlotStatus;
      number: number;
      avenue: string;
      id: number;
      leaseholderID: number | string;
      sector: string;
    } = {
      id: gardenId,
      sector: newGarden.sector,
      avenue: newGarden.avenue,
      number: newGarden.number,
      area: newGarden.area,
      leaseholderID: leasloderID,
      gardenStatus: newGarden.gardenStatus
    }
    const url = `${this.gardensURL}`;
    return this.httpClient.patch<any>(url, newGarden2);
  }

  addGarden(newGarden: GardenPlot): Observable<any> {
    const url = this.gardensURL;
    return this.httpClient.post<any>(url, newGarden);
  }

  editLeaseholder(gardenId: number | undefined, newLeaseholderID: number | null): Observable<any> {
    const url = `${this.gardensURL}`;
    let body: any
    if (newLeaseholderID !== null) {
      body = {
        id: gardenId,
        leaseholderID: newLeaseholderID
      }
    } else {
      body = {
        id: gardenId,
        leaseholderID: 'None'
      }
    }
    return this.httpClient.patch<any>(url, body);
  }


  // getAllGardenPlots2(): Observable<GardenPlot[]> {
  //   return of(this.gardenPlots);
  // }


}



