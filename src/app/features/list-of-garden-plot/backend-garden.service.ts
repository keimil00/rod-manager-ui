import {Injectable} from '@angular/core';
import {GardenPlot, GardenPlotBackend, PlotStatus} from "./garden-plot";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of, switchMap} from "rxjs";
import {Profile} from "../Profile";
import {Payment, PaymentList} from "./garden-plot-details/PaymentList";
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {Page} from "../../shared/paginator/page.model";

@Injectable({
  providedIn: 'root'
})
export class BackendGardenService {

  private paymentLists: PaymentList[] = [
    {
      id: 1,
      idUser: 1,
      userPaymentList: [
        {value: 325, date: new Date(2023, 10, 31)},
        {value: 230, date: new Date(2026, 10, 20)},
        {value: 280, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 2,
      idUser: 2,
      userPaymentList: [
        {value: 2340, date: new Date(2023, 10, 31)},
        {value: 2340, date: new Date(2023, 10, 31)},
        {value: 2450, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 3,
      idUser: 3,
      userPaymentList: [
        {value: 145, date: new Date(2023, 10, 31)},
        {value: 234, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 4,
      idUser: 4,
      userPaymentList: [
        {value: 145, date: new Date(2023, 10, 31)},
        {value: 145, date: new Date(2023, 10, 31)},
        {value: 432, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 5,
      idUser: 5,
      userPaymentList: [
        {value: 547, date: new Date(2023, 10, 31)},
        {value: 547, date: new Date(2023, 10, 31)},
        {value: 547, date: new Date(2023, 10, 31)},
        {value: 76, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 6,
      idUser: 6,
      userPaymentList: [
        {value: 863, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 7,
      idUser: 7,
      userPaymentList: [
        {value: 754, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 8,
      idUser: 8,
      userPaymentList: [
        {value: 435, date: new Date(2023, 10, 31)},
        {value: 434, date: new Date(2023, 10, 31)},
        {value: 34, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 9,
      idUser: 9,
      userPaymentList: [
        {value: 342, date: new Date(2023, 10, 31)},
        {value: 543, date: new Date(2026, 10, 31)},
        {value: 435, date: new Date(2023, 10, 31)},
        {value: 435, date: new Date(2028, 10, 31)},
        {value: 2435, date: new Date(2029, 10, 20)}
      ]
    },
    {
      id: 10,
      idUser: 10,
      userPaymentList: [
        {value: 2340, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 11,
      idUser: 11,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 12,
      idUser: 12,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 13,
      idUser: 13,
      userPaymentList: [
        {value: 45345, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 14,
      idUser: 14,
      userPaymentList: [
        {value: 55, date: new Date(2023, 10, 31)},
        {value: 656, date: new Date(2021, 5, 31)},
        {value: 565, date: new Date(2020, 10, 31)},
        {value: 5464, date: new Date(2023, 10, 31)},
        {value: 465, date: new Date(2021, 17, 31)},
        {value: 654, date: new Date(2023, 10, 31)},
        {value: 2546, date: new Date(2020, 3, 31)},
        {value: 546, date: new Date(2021, 6, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 15,
      idUser: 15,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 16,
      idUser: 16,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 17,
      idUser: 17,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 18,
      idUser: 18,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 19,
      idUser: 19,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    },
    {
      id: 20,
      idUser: 20,
      userPaymentList: [
        {value: 200, date: new Date(2023, 10, 31)},
        {value: 200, date: new Date(2024, 10, 20)}
      ]
    }];

  private gardenPlotsBackend: GardenPlotBackend[] = [
    {
      gardenPlotID: 1,
      sector: 'A',
      avenue: 'Avenue 1',
      number: 101,
      area: 500,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 2,
      sector: 'B',
      avenue: 'Avenue 2',
      number: 201,
      area: 600,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 3,
      sector: 'C',
      avenue: 'Avenue 3',
      number: 301,
      area: 750,
      leaseholder: 'John Doe',
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 4,
      sector: 'D',
      avenue: 'Avenue 4',
      number: 401,
      area: 550,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 5,
      sector: 'E',
      avenue: 'Avenue 5',
      number: 501,
      area: 700,
      leaseholder: 'Linda Jones',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 6,
      sector: 'F',
      avenue: 'Avenue 6',
      number: 601,
      area: 600,
      leaseholder: 'David Johnson',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 7,
      sector: 'G',
      avenue: 'Avenue 7',
      number: 701,
      area: 800,
      leaseholder: 'Susan Wilson',
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 8,
      sector: 'H',
      avenue: 'Avenue 8',
      number: 801,
      area: 900,
      leaseholder: 'Karen Taylor',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 9,
      sector: 'I',
      avenue: 'Avenue 9',
      number: 901,
      area: 450,
      leaseholder: 'Richard Anderson',
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 10,
      sector: 'J',
      avenue: 'Avenue 10',
      number: 1001,
      area: 600,
      leaseholder: 'Karen Martin',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 11,
      sector: 'K',
      avenue: 'Avenue 11',
      number: 1101,
      area: 700,
      leaseholder: 'Michael Lewis',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 12,
      sector: 'L',
      avenue: 'Avenue 12',
      number: 1201,
      area: 800,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 13,
      sector: 'M',
      avenue: 'Avenue 13',
      number: 1301,
      area: 750,
      leaseholder: 'Susan Clark',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 14,
      sector: 'N',
      avenue: 'Avenue 14',
      number: 1401,
      area: 600,
      leaseholder: 'Susan Jackson',
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 15,
      sector: 'O',
      avenue: 'Avenue 15',
      number: 1501,
      area: 850,
      leaseholder: 'William Garcia',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 16,
      sector: 'P',
      avenue: 'Avenue 16',
      number: 1601,
      area: 700,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 17,
      sector: 'Q',
      avenue: 'Avenue 17',
      number: 1701,
      area: 600,
      leaseholder: 'Patricia White',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 18,
      sector: 'R',
      avenue: 'Avenue 18',
      number: 1801,
      area: 750,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 19,
      sector: 'S',
      avenue: 'Avenue 19',
      number: 1901,
      area: 500,
      leaseholder: 'Jane Smith',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 20,
      sector: 'T',
      avenue: 'Avenue 20',
      number: 2001,
      area: 600,
      leaseholder: 'Mary Williams',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 21,
      sector: 'A',
      avenue: 'Avenue 1',
      number: 102,
      area: 600,
      leaseholder: null,
      gardenStatus: PlotStatus.Unavailable
    },
  ];

  private gardenPlots: GardenPlot[] = [
    {
      gardenPlotID: 1,
      sector: 'A',
      avenue: 'Avenue 1',
      number: 101,
      area: 500,
      leaseholderID: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 2,
      sector: 'B',
      avenue: 'Avenue 2',
      number: 201,
      area: 600,
      leaseholderID: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 3,
      sector: 'C',
      avenue: 'Avenue 3',
      number: 301,
      area: 750,
      leaseholderID: 101,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 4,
      sector: 'D',
      avenue: 'Avenue 4',
      number: 401,
      area: 550,
      leaseholderID: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 5,
      sector: 'E',
      avenue: 'Avenue 5',
      number: 501,
      area: 700,
      leaseholderID: 106,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 6,
      sector: 'F',
      avenue: 'Avenue 6',
      number: 601,
      area: 600,
      leaseholderID: 103,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 7,
      sector: 'G',
      avenue: 'Avenue 7',
      number: 701,
      area: 800,
      leaseholderID: 108,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 8,
      sector: 'H',
      avenue: 'Avenue 8',
      number: 801,
      area: 900,
      leaseholderID: 110,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 9,
      sector: 'I',
      avenue: 'Avenue 9',
      number: 901,
      area: 450,
      leaseholderID: 111,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 10,
      sector: 'J',
      avenue: 'Avenue 10',
      number: 1001,
      area: 600,
      leaseholderID: 116,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 11,
      sector: 'K',
      avenue: 'Avenue 11',
      number: 1101,
      area: 700,
      leaseholderID: 119,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 12,
      sector: 'L',
      avenue: 'Avenue 12',
      number: 1201,
      area: 800,
      leaseholderID: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 13,
      sector: 'M',
      avenue: 'Avenue 13',
      number: 1301,
      area: 750,
      leaseholderID: 120,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 14,
      sector: 'N',
      avenue: 'Avenue 14',
      number: 1401,
      area: 600,
      leaseholderID: 114,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 15,
      sector: 'O',
      avenue: 'Avenue 15',
      number: 1501,
      area: 850,
      leaseholderID: 117,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 16,
      sector: 'P',
      avenue: 'Avenue 16',
      number: 1601,
      area: 700,
      leaseholderID: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 17,
      sector: 'Q',
      avenue: 'Avenue 17',
      number: 1701,
      area: 600,
      leaseholderID: 112,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 18,
      sector: 'R',
      avenue: 'Avenue 18',
      number: 1801,
      area: 750,
      leaseholderID: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: 19,
      sector: 'S',
      avenue: 'Avenue 19',
      number: 1901,
      area: 500,
      leaseholderID: 102,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 20,
      sector: 'T',
      avenue: 'Avenue 20',
      number: 2001,
      area: 600,
      leaseholderID: 104,
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: 21,
      sector: 'A',
      avenue: 'Avenue 1',
      number: 102,
      area: 600,
      leaseholderID: null,
      gardenStatus: PlotStatus.Unavailable
    },
  ];

  constructor(private httpClient: HttpClient, private listOfUsersService:ListOfUsersService) {
  }

  private readonly gardensURL= 'api/gardens'
  private readonly gardenURL= 'api/garden'
  private readonly userURL= 'api/user'
  private readonly profileFromURL= 'api/profile-from-garden-id'

  loadedGardenPlots: GardenPlotBackend[] = this.gardenPlotsBackend;


  getGardenPlots(index: number, size: number): Observable<Page<GardenPlotBackend>> {
    const profilesOnPage = this.loadedGardenPlots.slice((index-1) * size, (index-1) * size + size);
    const count = this.loadedGardenPlots.length;
    const page: Page<GardenPlotBackend> = { count, results: profilesOnPage };

    return of(page);
  }

  //TODO to endpoint
  //   tu tez trzeba wziac  getTotalGardenPlotsCount
  getGardenPlots3(index: number, size: number): Observable<GardenPlotBackend[]> {
    const params = new HttpParams()
      .set('index', index.toString())
      .set('size', size.toString());
    return this.httpClient.get<GardenPlotBackend[]>(this.gardensURL, { params });
  }

  //TODO to endpoint
  getPayments2(user_id: number | undefined): Observable<Payment[]>{
      const url = `${this.userURL}/payments/${user_id}`;
      return this.httpClient.get<Payment[]>(url);
  }

  getPayments(user_id: number | undefined): Observable<Payment[]>{
    return of( this.paymentLists.find((user) => user.idUser === user_id)?.userPaymentList || []);
  }

  confirmPayment(userId: number | undefined, payment: Payment): Observable<any> {
    //obizyc kwote do zaplaty
    return of(this.paymentLists.find((user) => user.idUser === userId)?.userPaymentList.push(payment));
  }
  confirmPayment2(userId: number | undefined, payment: Payment): Observable<any> {
    //obizyc kwote do zaplaty
    const url = `${this.userURL}/confirmPayment${userId}`;
    return this.httpClient.post<any>(url, payment);
  }


  sortData() {
    this.gardenPlotsBackend.sort((a, b) => {
      // @ts-ignore
      const sectorComparison = a.sector.localeCompare(b.sector);
      if (sectorComparison !== 0) {
        return sectorComparison;
      }

      // @ts-ignore
      const avenueComparison = a.avenue.localeCompare(b.avenue);
      if (avenueComparison !== 0) {
        return avenueComparison;
      }
      return a.number - b.number;
    });
  }

  //TODO to endpoint
  getLeaseholder2(gardenPlotID: string): Observable<Profile> {
    const url = `${this.profileFromURL}/${gardenPlotID}`;
    return this.httpClient.get<Profile>(url);
  }

  // // @ts-ignore
  // profiles: Profile[];
  //
  // initProfiles() {
  //   this.listOfUsersService.getAllProfiles().subscribe((profiles: Profile[]) => {
  //     this.profiles = profiles;
  //   })
  //   console.log(this.profiles)
  // }
// @ts-ignore
  profiles: Profile[];

  initProfiles(): Observable<Profile[]> {
    return this.listOfUsersService.getAllProfiles();
  }

  getLeaseholder(gardenPlotID: number | undefined): Observable<Profile | null> {
    return this.initProfiles().pipe(
        switchMap((profiles: Profile[]) => {
          this.profiles = profiles;
          const id = this.gardenPlots.find(gardenPlot => gardenPlot.gardenPlotID === gardenPlotID)?.leaseholderID;
          const foundProfile = this.profiles.find(profile => profile.id === id);
          return of(foundProfile || null);
        })
    );
  }

  editGarden(gardenId: number | undefined, newGarden: GardenPlotBackend | undefined): Observable<any> {
    const index = this.gardenPlotsBackend.findIndex(garden => garden.gardenPlotID === gardenId);

    if (index !== -1) {
      if (newGarden) {
        this.gardenPlotsBackend[index] = newGarden;
      }
    } else {
      console.error('Garden not found with ID:', gardenId);
    }
    return of(null);
  }

  editGarden2(gardenId: number | undefined, newGarden: GardenPlot | undefined, gardenPlots: GardenPlot[]): Observable<any> {
    const index = gardenPlots.findIndex(garden => garden.gardenPlotID === gardenId);

    if (index !== -1) {
      if (newGarden) {
        gardenPlots[index] = newGarden;
      }
    } else {
      console.error('Garden not found with ID:', gardenId);
    }
    return of(null);
  }

  //TODO to endpoint
  editGarden3(gardenId: string | undefined, newGarden: GardenPlot): Observable<any> {
    const url = `${this.gardenURL}/${gardenId}`;
    return this.httpClient.put<any>(url, {newGarden});
  }


  addGarden(newGarden: GardenPlotBackend): Observable<any> {
    this.gardenPlotsBackend.push(newGarden)
    return of(null);
  }

  addGarden3(newGarden: GardenPlot): Observable<any> {
    this.gardenPlots.push(newGarden)
    return of(null);
  }

  //TODO to endpoint
  addGarden2(newGarden: GardenPlot): Observable<any> {
    const url = this.gardenURL;
    return this.httpClient.post<any>(url, {newGarden});
  }

  editLeaseholder(gardenId: number | undefined, newLeaseholderID: number | null): Observable<any> {
    const index = this.gardenPlotsBackend.findIndex(garden => garden.gardenPlotID === gardenId);

    if (index !== -1) {
      this.gardenPlotsBackend[index].leaseholder = newLeaseholderID;
    } else {
      console.error('Garden not found with ID:', gardenId);
    }
    return of(null);
  }

  editLeaseholder2(gardenId: number| undefined, newLeaseholderID: number | null, gardenPlots: GardenPlot[]): Observable<any> {
    const index = gardenPlots.findIndex(garden => garden.gardenPlotID === gardenId);

    if (index !== -1) {
      gardenPlots[index].leaseholderID = newLeaseholderID;
    } else {
      console.error('Garden not found with ID:', gardenId);
    }
    return of(null);
  }

  //TODO to endpoint
  editLeaseholder3(gardenId: number | undefined, newLeaseholderID: string | null): Observable<any> {
    const url = `${this.gardenURL}/leaseholder/${gardenId}`;
    return this.httpClient.patch<any>(url, {leaseholderID:newLeaseholderID});
  }

//nowe
//nowe
//nowe
//nowe
//nowe
//nowe
//nowe
//nowe
//nowe
  getAllGardenPlots(): Observable<GardenPlot[]> {
    return of(this.gardenPlots);
  }
  //TODO to endpoint
  // getAllGardenPlots(): Observable<GardenPlot[]> {
  //   const params = new HttpParams()
  //   return this.httpClient.get<GardenPlot[]>('https://localhost:1337/api/all-gardens');
  // }


  updateLeaseholderID(targetID: number | null | undefined, newLeaseholderID: number | null):Observable<any> {
    //to zastapi push
    for (let garden of this.gardenPlots) {
      if (garden.gardenPlotID === targetID) {
        garden.leaseholderID = newLeaseholderID
      }
    }
    return of(null);
  }
  updateLeaseholderID2(targetID: string | null | undefined, newLeaseholderID: string | null): Observable<any> {
    const url = `https://localhost:1337/api/updateLeaseholderID`;
    return this.httpClient.post<any>(url, {targetID,newLeaseholderID});
  }

}


// ### GET request with parameter
// DODAC jakos obiekt PAGE zeby pobrac ilosc wszystkich
//   GET https://localhost:1337/api/gardens?index=1&size=10
//     Accept: application/json
//
//   Response example:
//     [
//       {
//         "gardenPlotID": "1",
//         "sector": "A",
//         "avenue": "1",
//         "number": 1,
//         "area": 100,
//         "leaseholder": "John Doe",
//         "GardenStatus": "Available"
//       },
//       {
//         "gardenPlotID": "2",
//         "sector": "A",
//         "avenue": "1",
//         "number": 2,
//         "area": 100,
//         "leaseholder": "John Doe",
//         "GardenStatus": "Available"
//       }
//     ]
//
//   Response type:
//
//     [
//       {
//         gardenPlotID: string;
//         sector: string;
//         avenue: string;
//         number: number;
//         area: number;
//         leaseholder: string; // example: "John Doe"
//         GardenStatus: PlotStatus; // enum with values: "Available" or "Unavailable"
//       }
//     ]

// ### GET request
// niepotrzebne ale chce miec cos takiego wyzej w obiekcie page
// GET https://localhost:1337/api/gardens/count
//   Accept: application/json
//
// Response example:
// {
//   "totalCount": 50
// }
// Response type:
// {
//   totalCount: number;
// }


// // ### GET request with parameter
// GET https://localhost:1337/api/profile-from-garden-id/:garden-id
//   Accept: application/json
//
// Parameters:
//   garden-plot-id (string): The unique identifier of the garde
//
//   Response example:
// {
//   "profileId": "1",
//   "firstName": "John",
//   "lastName": "Doe",
//   "phoneNumber": "123-456-789",
//   "email": "john@example.com",
//   "accountStatus": ["USER"],
//   "paymentAmount": 100,
//   "paymentDueDate": "2023-12-31T00:00:00.000Z"
// }
// Response type:
// {
//   profileId: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   email: string;
//   accountStatus: Role[];
//   paymentAmount: number | null;
//   paymentDueDate: Date;
// }
// export enum Role {
//   ADMIN = 'ADMIN',
//   MANAGER = 'MANAGER',
//   GARDENER = 'GARDENER',
//   TECHNICAL_EMPLOYEE = 'TECHNICAL_EMPLOYEE',
//   NON_TECHNICAL_EMPLOYEE = 'NON_TECHNICAL_EMPLOYEE',
// }

// // ### POST with parameter
// POST https://localhost:1337/api/user/confirmPayment/:id
//   Content-Type: application/json
// Accept: application/json
//
// Request Body:
// {
//   "value": 50, // example: value of the new payment
//   "date": "2023-11-17" // example: date of the new payment
// }
// daje id uzytkownika i ma mu dodać tą płatność w userPaymentList tą płatność a dodatkowo obnizyc paymentAmount o value

// PUT https://localhost:1337/api/garden/:gardenId
//   Content-Type: application/json
// Accept: application/json
//
// Request Body:
// {
//   "newGarden": {
//         gardenId: string;
//         sector: string;
//         avenue: string;
//         number: number;
//         area: number;
//         leaseholderID: string;
//         GardenStatus: PlotStatus; // enum with values: "Available" or "Unavailable"
// }
// }

//GetPayments
// PATCH https://localhost:1337/api/user/payments/leaseholder:user_id
//   Content-Type: application/json
// Accept: application/json
//
// Request Body:
// {
//   "leaseholderID": 10,
// }


// POST https://localhost:1337/api/garden
//   Content-Type: application/json
// Accept: application/json
//
// Request Body:
// {
//   "newGarden": {
//         gardenId: string;
//         sector: string;
//         avenue: string;
//         number: number;
//         area: number;
//         leaseholderID: string;
//         GardenStatus: PlotStatus; // enum with values: "Available" or "Unavailable"
// }
// }

// ### GET request with parameter
//   GET https://localhost:1337/api/garden/payments:user_id
//     Accept: application/json
//
//   Response example:
// {
//   {value: 325, date: new Date(2023, 10, 31)},
//   {value: 230, date: new Date(2026, 10, 20)},
//   {value: 280, date: new Date(2024, 10, 20)}
// }

// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// inny
// ### GET request with parameter
//   GET https://localhost:1337/api/all-gardens
//     Accept: application/json
//
//   Response example:
//     [
//       {
//         "gardenPlotID": "1",
//         "sector": "A",
//         "avenue": "1",
//         "number": 1,
//         "area": 100,
//         "leaseholderID": 1,
//         "GardenStatus": "Available"
//       },
//       {
//         "gardenPlotID": "2",
//         "sector": "A",
//         "avenue": "1",
//         "number": 2,
//         "area": 100,
//         "leaseholderID": 2,
//         "GardenStatus": "Available"
//       }
//     ]
//
//   Response type:
//
//     [
//       {
//         gardenPlotID: string;
//         sector: string;
//         avenue: string;
//         number: number;
//         area: number;
//         leaseholderID: string; // example: "1"
//         GardenStatus: PlotStatus; // enum with values: "Available" or "Unavailable"
//       }
//     ]
//
//
// ### POST request to update leaseholderID
//
// Updates the leaseholderID for a specific garden plot by sending a POST request to the specified endpoint.
//
// #### Endpoint
//
// - Method: `POST`
// - URL: `https://localhost:1337/api/updateLeaseholderID`
// - Headers:
// - Content-Type: `application/json`
//
// #### Request body
//
// The request body should contain the following fields in JSON format:
//
//   ```json
// {
//   "targetID": "string | null | undefined",
//   "newLeaseholderID": "string | null"
// }
//
// Moja funkcja:
// updateLeaseholderID(targetID: string | null | undefined, newLeaseholderID: string | null) {
//   for (let garden of this.gardenPlots) {
//     if (garden.gardenPlotID === targetID) {
//       garden.leaseholderID = newLeaseholderID
//     }
//   }
// }

