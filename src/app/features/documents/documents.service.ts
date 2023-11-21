import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private httpClient: HttpClient) {}

  uploadMapDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>('https://localhost:1337/api/upload-map-document', formData);
  }

  uploadStatuteDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>('https://localhost:1337/api/upload-statute-document', formData);
  }

  uploadDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>('https://localhost:1337/api/upload-document', formData);
  }
}
