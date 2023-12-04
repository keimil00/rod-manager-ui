import {Injectable} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {VotingItem} from "./voting-item.model";
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
                {label: 'Opcja 1', optionId: 1, votes:0},
                {label: 'Opcja 2', optionId: 2, votes:0},
                {label: 'Opcja 3', optionId: 3, votes:0}
            ],
            finishDate: new Date(2024, 10, 10),
        },
        {
            id: 2,
            title: 'Temat 2',
            description: 'Opis tematu 2',
            options: [
                {label: 'Opcja 1', optionId: 1, votes:0},
                {label: 'Opcja 2', optionId: 2, votes:0},
                {label: 'Opcja 3', optionId: 3, votes:0}
            ],
            finishDate: new Date(2024, 10, 20),
        },
        // Dodaj inne przykładowe głosowania według potrzeb
    ];

    private finishedVotes: VotingItem[] = [
        {
            id: 1,
            title: 'Opinia na temat nowych zasad ogrodów działkowych',
            description: 'Prosimy o opinię na temat proponowanych zmian w regulaminie ogródków działkowych',
            options: [
                {optionId: 1, label: 'Zgadzam się z propozycjami', votes: 235},
                {optionId: 2, label: 'Nie mam zdania', votes: 320},
                {optionId: 3, label: 'Nie zgadzam się z propozycjami', votes: 120},
                {optionId: 4, label: 'Wstrzymuję się od głosu', votes: 120},
            ],
            finishDate: new Date(2023, 10, 10),
        },
        {
            id: 2,
            title: 'Wybór nowego miejsca na plac zabaw dla dzieci',
            description: 'Prosimy o wybór najlepszego miejsca na nowy plac zabaw dla dzieci w obrębie ogrodu działkowego',
            options: [
                {optionId: 1, label: 'Zielona Łąka', votes: 450},
                {optionId: 2, label: 'Sosnowy Gaj', votes: 345},
                {optionId: 3, label: 'Brzozowy Zakątek', votes: 25},
            ],
            finishDate: new Date(2023, 10, 20),
        },
        {
            id: 3,
            title: 'Wybór rośliny na nowy centralny klomb ogrodowy',
            description: 'Prosimy o wybór rośliny, która będzie głównym elementem w nowym centralnym kształcie klombu ogrodowego',
            options: [
                {optionId: 1, label: 'Róża', votes: 50},
                {optionId: 2, label: 'Tulipan', votes: 30},
                {optionId: 3, label: 'Lawenda', votes: 25},
                {optionId: 4, label: 'Stokrotka', votes: 40},
                {optionId: 5, label: 'Irys', votes: 15},
                {optionId: 6, label: 'Narcyz', votes: 20},
                {optionId: 7, label: 'Begonia', votes: 35},
                {optionId: 8, label: 'Goździk', votes: 22},
                {optionId: 9, label: 'Peon', votes: 28},
                {optionId: 10, label: 'Fiołek', votes: 18}
            ],
            finishDate: new Date(2023, 11, 10),
        }
    ];

    url: string = 'api/votings';
    constructor(private httpClient: HttpClient) {
    }

    getCurrentVotes1(): Observable<VotingItem[]> {
        // Symulujemy pobieranie aktualnych głosowań
        return of(this.currentVotes);
    }
    getCurrentVotes(): Observable<VotingItem[]> {
      const curentUrl = `${this.url}/current/`;
      return this.httpClient.get<VotingItem[]>(curentUrl);
    }

    getFinishedVotes1(): Observable<VotingItem[]> {
        // Symulujemy pobieranie skończonych głosowań
        return of(this.finishedVotes);
    }
    getFinishedVotes(): Observable<VotingItem[]> {
      const curentUrl = `${this.url}/completed/`;
      return this.httpClient.get<VotingItem[]>(curentUrl);
    }

    addNewVoting1(voting: VotingItem): Observable<string> {

        this.currentVotes.push(voting);

        console.log(`Dodano nowe głosowanie: ${voting.title}`);
        console.log(voting);
        return of(`Dodano nowe głosowanie: ${voting.title}`);
    }
    addNewVoting(voting: VotingItem): Observable<any> {
      const curentUrl = `${this.url}/add/`;
      return this.httpClient.post(curentUrl, voting);
    }

    // voteOn(voteId: number, selectedOptionID: number, profileID?: number): Observable<any> {
    //     return of(null)}

    voteOn(voteId: number, selectedOptionID: number): Observable<any> {
      const body={
        "voteId": voteId,
        "selectedOptionId": selectedOptionID,
      }
      const curentUrl = `${this.url}/vote/`;
      return this.httpClient.post(curentUrl, body);}


    //potrzebne do dodawania głosowania
    private addVotingSubject = new Subject<void>();
    addVotingFinished$ = this.addVotingSubject.asObservable();

    notifyAddVotingFinished() {
        this.addVotingSubject.next();
    }
}
