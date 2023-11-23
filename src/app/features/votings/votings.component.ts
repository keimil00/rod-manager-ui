import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddVotingComponent} from "./add-voting/add-voting.component";
import {VotingsService} from "./votings.service";
import {Role} from "../register/user.model";

@Component({
    selector: 'app-votings',
    templateUrl: './votings.component.html',
    styleUrls: ['./votings.component.scss']
})
export class VotingsComponent {

    constructor(public dialog: MatDialog, private votingService: VotingsService) {
    }

    openAddVotingDialog(): void {
        const dialogRef = this.dialog.open(AddVotingComponent, {
            width: '500px', // Ustaw rozmiar dialogu na 500px (możesz zmienić według potrzeb)
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.votingService.notifyAddVotingFinished();
            }
        });
    }

    protected readonly Role = Role;
}
