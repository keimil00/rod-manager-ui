import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TechnicalIssueDialogComponent} from "./technical-issue-dialog/technical-issue-dialog.component";

@Component({
  selector: 'app-footer-app',
  templateUrl: './footer-app.component.html',
  styleUrls: ['./footer-app.component.scss']
})
export class FooterAppComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TechnicalIssueDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Tutaj wykonaj akcję z danymi, które użytkownik wprowadził
        console.log('Wprowadzono:', result);
      }
    });
  }
}
