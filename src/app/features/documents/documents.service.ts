import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Document, Leaf} from "./document";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  // private documents: Document[] = [
  //     {id: '1', name: 'Dokument 1'},
  //     {id: '2', name: 'Dokument 2'},
  //     {
  //         id: '3',
  //         name: 'Lista Dokumentów',
  //         items: [
  //             {id: '4', name: 'Pod-Dokument 1'},
  //             {id: '5', name: 'Pod-Dokument 2'}
  //         ]
  //     }
  // ];

  private baseUrl = '/api/documents/';

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
    ;
  }

  deleteDocument(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}${id}/`);
  }


  isMapAvailable(): Observable<boolean> {
    return of(true)
  }

  isStatuteAvailable(): Observable<boolean> {
    return of(true)
  }


  isMapAvailable2(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/map`);
  }

  isStatuteAvailable2(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/statute`);
  }

}
