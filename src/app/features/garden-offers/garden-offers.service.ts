import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Page} from "../../shared/paginator/page.model";
import {Post} from "../home/post/post.model";
import {HttpParams} from "@angular/common/http";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";
import {GardenOffer} from "./garden-offer.model";

@Injectable({
  providedIn: 'root'
})
export class GardenOffersService {
  gardenOffers: GardenOffer[] = [];

  constructor() {
  for (let i = 1; i <= 10; i++) {
    const randomGardenOffer: GardenOffer = {
      title: `Garden Offer ${i}`,
      content: `This is a garden property offer ${i} with various features.`,
      contact: {
        name: `Contact Person ${i}`,
        phone: `Phone ${i}`,
        email: `email${i}@example.com`,
      },
      gardenInfo: {
        postNumber: Math.floor(Math.random() * 10000) + 1,
        address: `Address ${i}`,
        area: Math.floor(Math.random() * 5000) + 500, // Random area between 500 and 5500 square meters
        price: Math.floor(Math.random() * 500000) + 50000, // Random price between 50,000 and 550,000 dollars
        predictedRent: Math.floor(Math.random() * 2000) + 800, // Random predicted rent between 800 and 2800 dollars
      },
      createdAt: new Date(),
    };
    this.gardenOffers.push(randomGardenOffer);
  }
}

  fetchGardenOffers(index: number, size: number): Observable<Page<GardenOffer>> {
    const page = new Page<GardenOffer>();
    page.results = this.gardenOffers.slice(index, size);
    page.count = this.gardenOffers.length;
    return of(page);
  }
}
