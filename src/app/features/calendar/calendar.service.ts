import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";
import {Observable} from "rxjs";
import {GardenEvent} from "./event.model";
import {Post} from "../home/post/post.model";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private httpClient: HttpClient) {
  }

  fetchEvents(year: number, month: number): Observable<GardenEvent[]> {
    const params = new HttpParams()
      .set('year', year)
      .set('month', month)
    return this.httpClient.get<GardenEvent[]>(API_ENDPOINTS.public.getEvents, {params});
  }

  fetchPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${API_ENDPOINTS.public.getAnnouncements}${id}/`);
  }
}
