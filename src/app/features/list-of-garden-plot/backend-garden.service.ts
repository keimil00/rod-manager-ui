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
      status: PlotStatus;
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
      status: newGarden.gardenStatus
    }
    const url = `${this.gardensURL}`;
    return this.httpClient.patch<any>(url, newGarden2);
  }

  addGarden(newGarden: GardenPlot): Observable<any> {
    const body={
      sector: newGarden.sector,
      avenue: newGarden.avenue,
      number: newGarden.number,
      area: newGarden.area,
      leaseholderID: newGarden.leaseholderID,
      status: newGarden.gardenStatus
    }
    const url = this.gardensURL;
    return this.httpClient.post<any>(url, body);
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
}



