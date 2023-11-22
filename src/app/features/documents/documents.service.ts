import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Document} from "./document";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private documents: Document[] = [
    {id: '1', title: 'Dokument 1'},
    {id: '2', title: 'Dokument 2'},
    {
      id: '3',
      title: 'Lista Dokumentów',
      items: [
        {id: '4', title: 'Pod-Dokument 1'},
        {id: '5', title: 'Pod-Dokument 2'}
      ]
    }
  ];


  private baseUrl = '/api/documents';

  constructor(private httpClient: HttpClient) {
  }

  getDocuments(): Observable<Document[]>{
    return of(this.documents)
  }

  uploadMapDocument(file: File): Observable<any> {
    return this.uploadDocument(file, 'map')
  }

  uploadStatuteDocument(file: File): Observable<any> {
    return this.uploadDocument(file, 'statute')
  }

  uploadDocument(file: File, idDocument: string): Observable<any> {
    return of()
  }

  uploadDocument2(file: File, idDocument: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<any>(`${this.baseUrl}/${idDocument}`, formData);
  }

  update(documents: Document[]): Observable<any> {
    return of()
  }

  update2(documents: Document[]): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl, documents);
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


  downloadDocument(idDocument: string): Observable<string> {
    return this.httpClient.get<string>(`${this.baseUrl}/${idDocument}`);
  }

  downloadDocumentSimulate(idDocument: string): Observable<string> {
    return of('assets/Potwierdzenie_wykonania_operacji.pdf')
  }


}
