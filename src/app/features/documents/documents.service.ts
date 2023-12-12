import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Document, Leaf, RodDocument} from "./document";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private baseUrl = '/api/manager-documents/';
  private rodDocUrl = '/api/rod-documents/';

  constructor(private httpClient: HttpClient) {
  }

  getDocuments(): Observable<Document[]> {
    return this.httpClient.get<Document[]>(this.baseUrl);
  }

  putDocuments(leaf: Leaf, id: number): Observable<any> {
    const url = this.baseUrl + id + '/';
    if (leaf.file || leaf.file === null) {
      const formData = new FormData();

      if (leaf.file) {
        formData.append('name', leaf.name);
        formData.append('file', leaf.file);
        if (leaf.parent) {
          formData.append('parent', leaf.parent.toString());
          return this.httpClient.put(url, formData);
        }
        return this.httpClient.put(url, formData);
      } else {
        if (leaf.parent) {
          let body = {
            name: leaf.name,
          }
          return this.httpClient.put(url, body);
        } else {
          let body = {
            name: leaf.name,
            parent: leaf.parent
          }
          return this.httpClient.put(url, body);
        }
      }
    } else {
      return this.httpClient.put(url, leaf)
    }
  }

  postDocuments(leaf: Leaf): Observable<any> {
    if (leaf.file) {
      const formData = new FormData();

      formData.append('name', leaf.name);
      formData.append('file', leaf.file);
      if (leaf.parent) {
        formData.append('parent', leaf.parent.toString());
        return this.httpClient.post(this.baseUrl, formData);
      }

      return this.httpClient.post(this.baseUrl, formData);
    } else {
      return this.httpClient.post(this.baseUrl, leaf)
    }
  }

  deleteDocument(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}${id}/`);
  }

  getRodDocuments(): Observable<RodDocument[]> {
    return this.httpClient.get<RodDocument[]>(this.rodDocUrl);
  }

  postRodDocuments(body:any): Observable<any> {
    const formData = new FormData();

    formData.append('name', body.name);
    formData.append('file', body.file);
    return this.httpClient.post(this.rodDocUrl,formData);
  }

  isMapAvailable(): Observable<boolean> {
    return of(true)
  }

  isStatuteAvailable(): Observable<boolean> {
    return of(true)
  }


  isMapAvailable2(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.rodDocUrl}`);
  }

  isStatuteAvailable2(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.rodDocUrl}`);
  }

}
