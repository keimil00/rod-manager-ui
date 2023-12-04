import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Page} from "../../shared/paginator/page.model";
import {Post} from "../home/post/post.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";
import {
  Contact,
  Filters,
  GardenData,
  GardenOffer,
  GardenOfferCreate,
  GardenOfferExternal,
  MinMax
} from "./garden-offer.model";

@Injectable({
  providedIn: 'root'
})
export class GardenOffersService {
  private gardenOffers: GardenOfferExternal[] = [
    {
      id: 1,
      title: 'Lovely Urban Garden',
      body: 'A small, yet charming garden located in the city center.',
      contact: {
        name: 'John Doe',
        phone: '1234567890',
        email: 'johndoe@example.com'
      },
      garden_info: {
        address: '123 Main St, Anytown',
        area: 150,
        price: 2000,
        predicted_rent: 250
      },
      created_at: new Date('2023-01-01')
    },
    {
      id: 2,
      title: 'Spacious Country Garden',
      body: 'Perfect for large gatherings and events, located in the countryside.',
      contact: {
        name: 'Jane Smith',
        phone: '0987654321',
        email: 'janesmith@example.com'
      },
      garden_info: {
        address: '456 Country Rd, Somewhere',
        area: 300,
        price: 3500,
        predicted_rent: 400
      },
      created_at: new Date('2023-02-15')
    }
    // Add more items as needed
  ];

  constructor(private httpClient: HttpClient) {

  }

  fetchGardenOffers(index: number, size: number): Observable<Page<GardenOfferExternal>> {
    // return of({count: 2, results: this.gardenOffers});
    const params = new HttpParams()
      .set('page_size', size)
      .set('page', index);
    return this.httpClient.get<Page<GardenOfferExternal>>(API_ENDPOINTS.public.getGardenOffers, {params});
  }

  fetchGardenOffersWithFilters(index: number, size: number, filters: Filters): Observable<Page<GardenOfferExternal>> {
    // return of({count: 2, results: this.gardenOffers});
    let params = new HttpParams();

    if (filters.area_max != null) {
      params = params.append('area_max', filters.area_max.toString());
    }
    if (filters.area_min != null) {
      params = params.append('area_min', filters.area_min.toString());
    }
    if (filters.predicted_rent_max != null) {
      params = params.append('predicted_rent_max', filters.predicted_rent_max.toString());
    }
    if (filters.predicted_rent_min != null) {
      params = params.append('predicted_rent_min', filters.predicted_rent_min.toString());
    }
    if (filters.price_max != null) {
      params = params.append('price_max', filters.price_max.toString());
    }
    if (filters.price_min != null) {
      params = params.append('price_min', filters.price_min.toString());
    }
    if (filters.sort_by != null) {
      params = params.append('sort_by', filters.sort_by);
    }
    if (filters.sort_order != null) {
      params = params.append('sort_order', filters.sort_order);
    }
    params = params.append('page_size', size);
    params = params.append('page', index);

// Now you can use 'params' in your HTTP request

    return this.httpClient.get<Page<GardenOfferExternal>>(API_ENDPOINTS.public.getGardenOffers, {params});
  }

  fetchManagers(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(API_ENDPOINTS.public.getContacts);
  }

  fetchAvailableGardens(): Observable<GardenData[]> {
    return this.httpClient.get<GardenData[]>(API_ENDPOINTS.public.getAvailableOffers);
  }

  createGardenOffer(offer: GardenOfferCreate): Observable<any> {
    return this.httpClient.post<any>(API_ENDPOINTS.authenticated.createGardenOffer, offer);
  }

  fetchMinMax(): Observable<MinMax> {
    return this.httpClient.get<MinMax>(API_ENDPOINTS.public.getMinMax)
  }
}
