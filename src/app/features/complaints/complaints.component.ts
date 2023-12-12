import {Component, OnInit} from '@angular/core';
import {ComplaintsService} from "./complaints.service";
import {BehaviorSubject, finalize, interval, map, Observable, switchMap, tap} from "rxjs";
import {ComplaintInfo, ComplaintWithMessages} from "./complaint.model";
import {ToastrService} from "ngx-toastr";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ComplaintDialogComponent} from "./complaint-dialog/complaint-dialog.component";
import {MatSelectChange} from "@angular/material/select";
import {Role} from "../register/user.model";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
  complaints$: Observable<ComplaintInfo[]>;

  selectedComplaint?: ComplaintWithMessages; // Replace with your actual complaint type
  statuses: string[] = ['Reported', 'Accepted', 'InProgress', 'Complete', 'Rejected'];

  newMessage = new FormControl('');
  stateFilter = '';

  constructor(private complaintsService: ComplaintsService, private toastr: ToastrService, public dialog: MatDialog) {
    this.complaints$ = this.complaintsService.fetchComplaints()
        .pipe(
            map(page => {
              if (page.results.length > 0) {
                this.selectComplaint(page.results[0].id);
              }
              return page.results
            })
        );
  }

  ngOnInit(): void {
    const refreshInterval$ = interval(2000); // 5000 milliseconds = 5 seconds
    refreshInterval$.pipe(
      tap(() => {
        console.log('Refresh')
        this.refresh()
      })
    );
  }

  fetchComplaintsWithFilters() {
    this.complaints$ = this.complaintsService.fetchComplaintsWithState(this.stateFilter).pipe(map(page => page.results));
  }

  selectComplaint(id: number) {
    this.complaintsService.fetchComplaintWithMessages(id).subscribe({
        next: value => {
          this.selectedComplaint = value;
        },
        error: err => {
          this.toastr.error('Wystąpił problem z serwerem!')
        }
      }
    );
  }

  refresh() {
    this.complaints$ = this.complaintsService.fetchComplaints().pipe(map(page => page.results));
    if (this.selectedComplaint) {
      this.complaintsService.fetchComplaintWithMessages(this.selectedComplaint.id).subscribe({
          next: value => {
            this.selectedComplaint = value;
          },
          error: err => {
            this.toastr.error('Wystąpił problem z serwerem!')
          }
        }
      );
    }
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Reported':
        return 'status-reported';
      case 'Accepted':
        return 'status-accepted';
      case 'InProgress':
        return 'status-inprogress';
      case 'Complete':
        return 'status-complete';
      case 'Rejected':
        return 'status-rejected';
      default:
        return 'default-status'; // A default class if the status doesn't match
    }
  }

  changeStatus(newStatus: string): void {
    if (this.selectedComplaint) {
      this.selectedComplaint.state = newStatus;
      this.complaintsService.changeState(this.selectedComplaint.id, newStatus)
        .subscribe({
          error: err => {
            this.toastr.error('Wystąpił problem z połączeniem do serwera')
          }
        });
    }
  }

  sendMessage(complaint: number) {
    if (this.newMessage.value) {
      this.complaintsService.sendNewMessage(this.newMessage.value, complaint)
        .subscribe({
          next: value => {
            this.selectedComplaint?.messages.push(value);
          },
          error: err => {
            this.toastr.error('Nie udało się wysłać wiadomości');
          }
        })
      this.newMessage.reset();
    }
  }

  openCreateComplaintDialog() {
    const dialogRef = this.dialog.open(ComplaintDialogComponent, {
      width: '60%',
      // You can pass data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result from the dialog
      this.refresh();
    });
  }

    protected readonly Role = Role;
}
