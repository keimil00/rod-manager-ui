import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {VotingItem} from "./voting-item.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VotingsService {
  private currentVotes: VotingItem[] = [
    {
      id: '1',
      title: 'Temat 1',
      description: 'Opis tematu 1',
      options: [
        { label: 'Opcja 1', optionId: '1' },
        { label: 'Opcja 2', optionId: '2' },
        { label: 'Opcja 3', optionId: '3' }
      ]
    },
    {
      id: '2',
      title: 'Temat 2',
      description: 'Opis tematu 2',
      options: [
        { label: 'Opcja 1', optionId: '1' },
        { label: 'Opcja 2', optionId: '2' },
        { label: 'Opcja 3', optionId: '3' }
      ]
    },
    // Dodaj inne przykładowe głosowania według potrzeb
  ];

  constructor(private httpClient: HttpClient) {}

  getCurrentVotes(): Observable<VotingItem[]> {
    // Symulujemy pobieranie aktualnych głosowań
    return of(this.currentVotes);
  }

  voteOn(voteId: string, selectedOption: string, profileID?:string): Observable<string> {
    // Logika oddawania głosu na dany element (np. wysłanie zapytania do serwera)
    console.log(`Oddano głos na element o ID: ${voteId}, wybrana opcja: ${selectedOption}`);
    return of(`Oddano głos na element o ID: ${voteId}, wybrana opcja: ${selectedOption}`);
  }
}
