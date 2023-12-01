import {Injectable} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {VotedItem, VotingItem} from "./voting-item.model";
import {HttpClient} from "@angular/common/http";
import {Page} from "../../shared/paginator/page.model";
import {Profile} from "../Profile";

@Injectable({
    providedIn: 'root'
})
export class VotingsService {
    private currentVotes: VotingItem[] = [
        {
            id: 1,
            title: 'Temat 1',
            description: 'Opis tematu 1',
            options: [
                {label: 'Opcja 1', option_id: 1, vote_count:0},
                {label: 'Opcja 2', option_id: 2, vote_count:0},
                {label: 'Opcja 3', option_id: 3, vote_count:0}
            ],
            end_date: new Date(2024, 10, 10),
        },
        {
            id: 2,
            title: 'Temat 2',
            description: 'Opis tematu 2',
            options: [
                {label: 'Opcja 1', option_id: 1, vote_count:0},
                {label: 'Opcja 2', option_id: 2, vote_count:0},
                {label: 'Opcja 3', option_id: 3, vote_count:0}
            ],
            end_date: new Date(2024, 10, 20),
        },
        // Dodaj inne przykładowe głosowania według potrzeb
    ];

    private finishedVotes: VotingItem[] = [
        {
            id: 1,
            title: 'Opinia na temat nowych zasad ogrodów działkowych',
            description: 'Prosimy o opinię na temat proponowanych zmian w regulaminie ogródków działkowych',
            options: [
                {option_id: 1, label: 'Zgadzam się z propozycjami', vote_count: 235},
                {option_id: 2, label: 'Nie mam zdania', vote_count: 320},
                {option_id: 3, label: 'Nie zgadzam się z propozycjami', vote_count: 120},
                {option_id: 4, label: 'Wstrzymuję się od głosu', vote_count: 120},
            ],
            end_date: new Date(2023, 10, 10),
        },
        {
            id: 2,
            title: 'Wybór nowego miejsca na plac zabaw dla dzieci',
            description: 'Prosimy o wybór najlepszego miejsca na nowy plac zabaw dla dzieci w obrębie ogrodu działkowego',
            options: [
                {option_id: 1, label: 'Zielona Łąka', vote_count: 450},
                {option_id: 2, label: 'Sosnowy Gaj', vote_count: 345},
                {option_id: 3, label: 'Brzozowy Zakątek', vote_count: 25},
            ],
            end_date: new Date(2023, 10, 20),
        },
        {
            id: 3,
            title: 'Wybór rośliny na nowy centralny klomb ogrodowy',
            description: 'Prosimy o wybór rośliny, która będzie głównym elementem w nowym centralnym kształcie klombu ogrodowego',
            options: [
                {option_id: 1, label: 'Róża', vote_count: 50},
                {option_id: 2, label: 'Tulipan', vote_count: 30},
                {option_id: 3, label: 'Lawenda', vote_count: 25},
                {option_id: 4, label: 'Stokrotka', vote_count: 40},
                {option_id: 5, label: 'Irys', vote_count: 15},
                {option_id: 6, label: 'Narcyz', vote_count: 20},
                {option_id: 7, label: 'Begonia', vote_count: 35},
                {option_id: 8, label: 'Goździk', vote_count: 22},
                {option_id: 9, label: 'Peon', vote_count: 28},
                {option_id: 10, label: 'Fiołek', vote_count: 18}
            ],
            end_date: new Date(2023, 11, 10),
        }
    ];

    url: string = 'api/polls/';
    constructor(private httpClient: HttpClient) {
    }

    getCurrentVotes1(): Observable<VotingItem[]> {
        // Symulujemy pobieranie aktualnych głosowań
        return of(this.currentVotes);
    }
    getCurrentVotes(): Observable<VotingItem[]> {
      const curentUrl = `${this.url}current/`;
      return this.httpClient.get<VotingItem[]>(curentUrl);
    }

    getFinishedVotes1(): Observable<VotingItem[]> {
        // Symulujemy pobieranie skończonych głosowań
        return of(this.finishedVotes);
    }
    getFinishedVotes(): Observable<VotedItem[]> {
      const curentUrl = `${this.url}completed/`;
      return this.httpClient.get<VotedItem[]>(curentUrl);
    }

    getVotedVoting(): Observable<VotedItem[]> {
      const curentUrl = `${this.url}voted/`;
      return this.httpClient.get<VotedItem[]>(curentUrl);
    }


  addNewVoting1(voting: VotingItem): Observable<string> {

        this.currentVotes.push(voting);

        console.log(`Dodano nowe głosowanie: ${voting.title}`);
        console.log(voting);
        return of(`Dodano nowe głosowanie: ${voting.title}`);
    }
    addNewVoting(voting: VotingItem): Observable<any> {
      const curentUrl = `${this.url}`;
      return this.httpClient.post(curentUrl, voting);
    }

    // voteOn(voteId: number, selectedOptionID: number, profileID?: number): Observable<any> {
    //     return of(null)}

    voteOn(voteId: number, selectedOptionID: number): Observable<any> {
      const body={
        "poll_id": voteId,
        "option_id": selectedOptionID,
      }
      const curentUrl = `${this.url}vote/`;
      return this.httpClient.post(curentUrl, body);}


    //potrzebne do dodawania głosowania
    private addVotingSubject = new Subject<void>();
    addVotingFinished$ = this.addVotingSubject.asObservable();

    notifyAddVotingFinished() {
        this.addVotingSubject.next();
    }


    //potrzebne do dodawania głosu
    private addVoteSubject = new Subject<void>();
    addVoteFinished$ = this.addVoteSubject.asObservable();

    notifyAddVoteFinished() {
      this.addVoteSubject.next();
  }
}
