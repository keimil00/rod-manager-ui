import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private baseUrl = '/api/documents';
  constructor(private httpClient: HttpClient) {}

  uploadMapDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>(`${this.baseUrl}/upload-map`, formData);
  }

  uploadStatuteDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>(`${this.baseUrl}/upload-statute`, formData);
  }

  downloadDocument(documentId: string): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/download/${documentId}`, { responseType: 'blob' });
  }


  // downloadDocumentSimulate(): Observable<Blob> {
  //   const filePath = '../../../assets/Potwierdzenie_wykonania_operacji.pdf';
  //   return this.httpClient.get(filePath, { responseType: 'blob' });
  // }
  downloadDocumentSimulate(): Observable<Blob> {
    const filePath = 'assets/Potwierdzenie_wykonania_operacji.pdf';
    return this.httpClient.get(filePath, { responseType: 'blob' });
  }


}
