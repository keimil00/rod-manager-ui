import {Injectable} from '@angular/core';
import {GardenPlot, GardenPlotBackend, PlotStatus} from "./garden-plot";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../Profile";
import {profiles} from "../list-of-users/ProfilesService";
import {Payment} from "./garden-plot-details/PaymentList";
import {gardenPlots} from "./GardenService";

@Injectable({
  providedIn: 'root'
})
export class BackendGardenService {

  gardenPlotsBackend: GardenPlotBackend[] = [
    {
      gardenPlotID: '1',
      sector: 'A',
      avenue: 'Avenue 1',
      number: 101,
      area: 500,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '2',
      sector: 'B',
      avenue: 'Avenue 2',
      number: 201,
      area: 600,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '3',
      sector: 'C',
      avenue: 'Avenue 3',
      number: 301,
      area: 750,
      leaseholder: 'John Doe',
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '4',
      sector: 'D',
      avenue: 'Avenue 4',
      number: 401,
      area: 550,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '5',
      sector: 'E',
      avenue: 'Avenue 5',
      number: 501,
      area: 700,
      leaseholder: 'Linda Jones',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '6',
      sector: 'F',
      avenue: 'Avenue 6',
      number: 601,
      area: 600,
      leaseholder: 'David Johnson',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '7',
      sector: 'G',
      avenue: 'Avenue 7',
      number: 701,
      area: 800,
      leaseholder: 'Susan Wilson',
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '8',
      sector: 'H',
      avenue: 'Avenue 8',
      number: 801,
      area: 900,
      leaseholder: 'Karen Taylor',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '9',
      sector: 'I',
      avenue: 'Avenue 9',
      number: 901,
      area: 450,
      leaseholder: 'Richard Anderson',
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '10',
      sector: 'J',
      avenue: 'Avenue 10',
      number: 1001,
      area: 600,
      leaseholder: 'Karen Martin',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '11',
      sector: 'K',
      avenue: 'Avenue 11',
      number: 1101,
      area: 700,
      leaseholder: 'Michael Lewis',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '12',
      sector: 'L',
      avenue: 'Avenue 12',
      number: 1201,
      area: 800,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '13',
      sector: 'M',
      avenue: 'Avenue 13',
      number: 1301,
      area: 750,
      leaseholder: 'Susan Clark',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '14',
      sector: 'N',
      avenue: 'Avenue 14',
      number: 1401,
      area: 600,
      leaseholder: 'Susan Jackson',
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '15',
      sector: 'O',
      avenue: 'Avenue 15',
      number: 1501,
      area: 850,
      leaseholder: 'William Garcia',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '16',
      sector: 'P',
      avenue: 'Avenue 16',
      number: 1601,
      area: 700,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '17',
      sector: 'Q',
      avenue: 'Avenue 17',
      number: 1701,
      area: 600,
      leaseholder: 'Patricia White',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '18',
      sector: 'R',
      avenue: 'Avenue 18',
      number: 1801,
      area: 750,
      leaseholder: null,
      gardenStatus: PlotStatus.Available
    },
    {
      gardenPlotID: '19',
      sector: 'S',
      avenue: 'Avenue 19',
      number: 1901,
      area: 500,
      leaseholder: 'Jane Smith',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '20',
      sector: 'T',
      avenue: 'Avenue 20',
      number: 2001,
      area: 600,
      leaseholder: 'Mary Williams',
      gardenStatus: PlotStatus.Unavailable
    },
    {
      gardenPlotID: '21',
      sector: 'A',
      avenue: 'Avenue 1',
      number: 102,
      area: 600,
      leaseholder: null,
      gardenStatus: PlotStatus.Unavailable
    },
  ];

  constructor(private httpClient: HttpClient) {
  }

  loadedGardenPlots: GardenPlotBackend[] = this.gardenPlotsBackend;

  getTotalGardenPlotsCount(): number {
    return this.loadedGardenPlots.length;
  }

  //TODO to endpoint
  //   jednak bedzie jakos z PAGE
  // getTotalPostsCount(): Observable<number> {
  //   return this.httpClient.get<number>('https://localhost:1337/api/gardens/count');
  // }


  getGardenPlots(index: number, size: number): GardenPlotBackend[] {
    return this.loadedGardenPlots.slice(index * size, index * size + size);
  }

  //TODO to endpoint
  //   tu tez trzeba wziac  getTotalGardenPlotsCount
  // getGardenPlots(index: number, size: number): Observable<GardenPlotBackend[]> {
  //   const params = new HttpParams()
  //     .set('index', index.toString())
  //     .set('size', size.toString());
  //   return this.httpClient.get<GardenPlotBackend[]>('https://localhost:1337/api/gardens', { params });
  // }

  //TODO to endpoint
  getPayments(user_id: string | undefined): Observable<any>{
      const url = `https://localhost:1337/api/garden/payments/${user_id}`;
      return this.httpClient.get<Payment[]>(url);
  }

  confirmPayment(userId: string | undefined, payment: Payment): Observable<any> {
    const url = `https://localhost:1337/api/user/confirmPayment/${userId}`;
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
  // getLeaseholder(gardenPlotID: string): Observable<Profile> {
  //   const url = `${'https://localhost:1337/api/profile-from-garden-id'}/${gardenPlotID}`;
  //   return this.httpClient.get<Profile>(url);
  // }
  getLeaseholder(gardenPlotID: string | undefined, gardenPlots: GardenPlot[]): Profile {
    const id = gardenPlots.find(gardenPlot => gardenPlot.gardenPlotID === gardenPlotID)?.leaseholderID
    return <Profile>profiles.find(profile => profile.profileId === id) || null;
  }

  editGarden(gardenId: string | undefined, newGarden: GardenPlotBackend | undefined): void {
    const index = this.gardenPlotsBackend.findIndex(garden => garden.gardenPlotID === gardenId);

    if (index !== -1) {
      if (newGarden) {
        this.gardenPlotsBackend[index] = newGarden;
      }
    } else {
      console.error('Garden not found with ID:', gardenId);
    }
  }

  editGarden2(gardenId: string | undefined, newGarden: GardenPlot | undefined, gardenPlots: GardenPlot[]): void {
    const index = gardenPlots.findIndex(garden => garden.gardenPlotID === gardenId);

    if (index !== -1) {
      if (newGarden) {
        gardenPlots[index] = newGarden;
      }
    } else {
      console.error('Garden not found with ID:', gardenId);
    }
  }

  //TODO to endpoint
  editGarden3(gardenId: string | undefined, newGarden: GardenPlot): Observable<any> {
    const url = `${'https://localhost:1337/api/garden'}/${gardenId}`;
    return this.httpClient.put<any>(url, {newGarden});
  }


  addGarden(newGarden: GardenPlotBackend): void {
    this.gardenPlotsBackend.push(newGarden)
  }


  //TODO to endpoint
  addGarden2(newGarden: GardenPlot): Observable<any> {
    const url = `${'https://localhost:1337/api/garden'}`;
    return this.httpClient.post<any>(url, {newGarden});
  }

  editLeaseholder(gardenId: string | undefined, newLeaseholderID: string | null): void {
    const index = this.gardenPlotsBackend.findIndex(garden => garden.gardenPlotID === gardenId);

    if (index !== -1) {
      this.gardenPlotsBackend[index].leaseholder = newLeaseholderID;
    } else {
      console.error('Garden not found with ID:', gardenId);
    }
  }

  editLeaseholder2(gardenId: string | undefined, newLeaseholderID: string | null, gardenPlots: GardenPlot[]): void {
    const index = gardenPlots.findIndex(garden => garden.gardenPlotID === gardenId);

    if (index !== -1) {
      gardenPlots[index].leaseholderID = newLeaseholderID;
    } else {
      console.error('Garden not found with ID:', gardenId);
    }
  }

  //TODO to endpoint
  editLeaseholder3(gardenId: string | undefined, newLeaseholderID: string | null): Observable<any> {
    const url = `${'https://localhost:1337/api/api/garden/leaseholder'}/${gardenId}`;
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
  getAllGardenPlots(): GardenPlot[] {
    return gardenPlots
  }
  //TODO to endpoint
  // getAllGardenPlots(): Observable<GardenPlot[]> {
  //   const params = new HttpParams()
  //   return this.httpClient.get<GardenPlot[]>('https://localhost:1337/api/all-gardens');
  // }

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
//   accountStatus: Role_TEMP[]; // enum with values: "USER" or "ADMIN " or "MANAGER" or "GARDENER" or "EMPLOYEE"
//   paymentAmount: number | null;
//   paymentDueDate: Date;
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


// PATCH https://localhost:1337/api/garden/leaseholder:garden-plot-id
//   Content-Type: application/json
// Accept: application/json
//
// Request Body:
// {
//   "leaseholderID": 10, // example: value of the new payment
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

