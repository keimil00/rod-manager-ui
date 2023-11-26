import {Injectable} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {VotingItem, VotingItem2} from "./voting-item.model";
import {HttpClient} from "@angular/common/http";

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
                {label: 'Opcja 1', optionId: 1},
                {label: 'Opcja 2', optionId: 2},
                {label: 'Opcja 3', optionId: 3}
            ],
            finishDate: new Date(2024, 10, 10),
        },
        {
            id: 2,
            title: 'Temat 2',
            description: 'Opis tematu 2',
            options: [
                {label: 'Opcja 1', optionId: 1},
                {label: 'Opcja 2', optionId: 2},
                {label: 'Opcja 3', optionId: 3}
            ],
            finishDate: new Date(2024, 10, 20),
        },
        // Dodaj inne przykładowe głosowania według potrzeb
    ];

    private finishedVotes: VotingItem2[] = [
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

    constructor(private httpClient: HttpClient) {
    }

    getCurrentVotes(): Observable<VotingItem[]> {
        // Symulujemy pobieranie aktualnych głosowań
        return of(this.currentVotes);
    }

    getFinishedVotes(): Observable<VotingItem2[]> {
        // Symulujemy pobieranie skończonych głosowań
        return of(this.finishedVotes);
    }

    addNewVoting(voting: VotingItem): Observable<string> {

        this.currentVotes.push(voting);

        console.log(`Dodano nowe głosowanie: ${voting.title}`);
        console.log(voting);
        return of(`Dodano nowe głosowanie: ${voting.title}`);
    }

    voteOn(voteId: number, selectedOption: string, profileID?: number): Observable<string> {
        // Logika oddawania głosu na dany element (np. wysłanie zapytania do serwera)
        console.log(`Oddano głos na element o ID: ${voteId}, wybrana opcja: ${selectedOption}`);
        return of(`Oddano głos na element o ID: ${voteId}, wybrana opcja: ${selectedOption}`);
    }


    //potrzebne do dodawania głosowania
    private addVotingSubject = new Subject<void>();
    addVotingFinished$ = this.addVotingSubject.asObservable();

    notifyAddVotingFinished() {
        this.addVotingSubject.next();
    }
}
