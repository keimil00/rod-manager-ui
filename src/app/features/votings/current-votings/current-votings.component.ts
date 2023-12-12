import {Component} from '@angular/core';
import {VotingsService} from "../votings.service";
import {VotingItem} from "../voting-item.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

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

  constructor(
    private votingService: VotingsService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.getCurrentVoting();
    this.addVotingFinishedSubscription = this.votingService.addVotingFinished$.subscribe(() => {
      this.getCurrentVoting();
    });
    this.scheduleMidnightRefresh();
  }

  ngOnDestroy() {
    this.addVotingFinishedSubscription.unsubscribe();
  }

  getCurrentVoting() {
    this.spinner.show()
    this.votingService.getCurrentVotes().subscribe({
      next: (votes: VotingItem[]) => {
        this.currentVotes = votes;
        this.initializeFormControls();
        this.spinner.hide()
      }, error: err => {
        console.error(err);
        this.toastr.error('Nie udało się pobrać głosowania', 'Błąd');
        this.spinner.hide()
      }
    });
  }

  initializeFormControls() {
    for (const vote of this.currentVotes) {
      this.selectedOptions[vote.id] = new FormControl();
    }
  }

  // Teoretycznie to powinno odwieżać głosowania po północy, ale nie testowałem tego XD
  scheduleMidnightRefresh() {
    const now = new Date();
    const currentHour = now.getHours();

    // Oblicz czas do północy
    const midnight = new Date(now); // Tworzymy kopię obecnego czasu
    midnight.setHours(24, 0, 0, 0); // Ustawiamy na północ kolejnego dnia

    const timeUntilMidnight = midnight.getTime() - now.getTime();

    // Ustawienie timera na pobranie danych po północy
    setTimeout(() => {
      this.getCurrentVoting();
      this.scheduleMidnightRefresh(); // Zaplanowanie kolejnego pobrania danych po północy
    }, timeUntilMidnight);
  }

  selectOption(voteId: number, selectedOption: number) {
    this.selectedOptions[voteId].setValue(selectedOption);
  }

  isVoteValid(voteId: number): boolean {
    return !!this.selectedOptions[voteId].value;
  }

  submitVote(voteId: number) {
    if (this.isVoteValid(voteId)) {
      const selectedOptionID = this.selectedOptions[voteId].value;
      const currentVote = this.currentVotes.find(vote => vote.id === voteId);
      if (currentVote) {
        const selectedOption = currentVote.options.find(option => option.option_id === selectedOptionID)?.label;
        // @ts-ignore
        if (selectedOptionID) {
          console.log(voteId, selectedOptionID);
          this.votingService.voteOn(voteId, selectedOptionID).subscribe((result: string) => {
            this.showSuccessMessage(`${selectedOption}: w głosowaniu: ${currentVote.title}`);
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
