import {Component} from '@angular/core';
import {VotingsService} from "../votings.service";
import {VotingItem} from "../voting-item.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-current-votings',
    templateUrl: './current-votings.component.html',
    styleUrls: ['./current-votings.component.scss']
})
export class CurrentVotingsComponent {
    // @ts-ignore
    currentVotes: VotingItem[];
    selectedOptions: { [voteId: string]: FormControl } = {};
    // @ts-ignore
    private addVotingFinishedSubscription: Subscription;

    constructor(private votingService: VotingsService, private _snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.getCurrentVoting();
        this.addVotingFinishedSubscription = this.votingService.addVotingFinished$.subscribe(() => {
            this.getCurrentVoting();
        });
    }

    ngOnDestroy() {
        this.addVotingFinishedSubscription.unsubscribe();
    }

    getCurrentVoting() {
        this.votingService.getCurrentVotes().subscribe((votes: VotingItem[]) => {
            this.currentVotes = votes;
            this.initializeFormControls();
        });
    }

    initializeFormControls() {
        for (const vote of this.currentVotes) {
            this.selectedOptions[vote.id] = new FormControl();
        }
    }

    selectOption(voteId: number, selectedOption: number) {
        this.selectedOptions[voteId].setValue(selectedOption);
    }

    isVoteValid(voteId: number): boolean {
        return !!this.selectedOptions[voteId].value;
    }

    submitVote(voteId: number) {
        if (this.isVoteValid(voteId)) {
            const selectedOption = this.selectedOptions[voteId].value;
            const currentVote = this.currentVotes.find(vote => vote.id === voteId);
            if (currentVote) {
                const selectedOptionID = currentVote.options.find(option => option.option_id === selectedOption)?.option_id;
                if (selectedOptionID) {
                  console.log(voteId, selectedOptionID);
                    this.votingService.voteOn(voteId, selectedOptionID).subscribe((result: string) => {
                        this.showSuccessMessage(`${selectedOptionID}: ${currentVote.title}`);
                        this.selectedOptions[voteId].reset(); // Resetuj wartość wybranej opcji po zatwierdzeniu głosu
                        this.getCurrentVoting();
                        this.votingService.notifyAddVoteFinished()
                    });
                }
            }
        }
    }

    private showSuccessMessage(message: string): void {
        this._snackBar.open(`Pomyślnie zagłosowano na: ${message}`, 'Zamknij', {duration: 4000});
    }
}
