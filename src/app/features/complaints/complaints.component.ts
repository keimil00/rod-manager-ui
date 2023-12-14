import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComplaintsService} from "./complaints.service";
import {map} from "rxjs";
import {ComplaintInfo, ComplaintWithMessages} from "./complaint.model";
import {ToastrService} from "ngx-toastr";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ComplaintDialogComponent} from "./complaint-dialog/complaint-dialog.component";
import {Role} from "../register/user.model";
import {TopAppBarService} from "../../core/top-app-bar/top-app-bar.service";

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit, OnDestroy {
    complaints: ComplaintInfo[] = [];

    selectedComplaint?: ComplaintWithMessages; // Replace with your actual complaint type
    statuses: string[] = ['Reported', 'Accepted', 'InProgress', 'Complete', 'Rejected'];

    newMessage = new FormControl('');
    stateFilter = '';
    private interval: any = null;

    constructor(private complaintsService: ComplaintsService,
                private toastr: ToastrService,
                public dialog: MatDialog,
                private topAppBarService: TopAppBarService) {
        this.complaintsService.fetchComplaints()
            .pipe(
                map(page => {
                    if (page.results.length > 0) {
                        this.selectComplaint(page.results[0].id);
                    }
                    return page.results
                })
            ).subscribe({
            next: value => {
                this.complaints = value;
            }
        });
    }

    ngOnInit(): void {
        this.interval = setInterval(() => {
            this.refresh()
        }, 8000);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
        this.interval = null;
    }

    fetchComplaintsWithFilters() {
        this.complaintsService.fetchComplaintsWithState(this.stateFilter)
            .pipe(map(page => page.results))
            .subscribe({
                next: value => {
                    this.complaints = value;
                }
            });
    }

    selectComplaint(id: number) {
        this.complaintsService.fetchComplaintWithMessages(id).subscribe({
                next: value => {
                    this.selectedComplaint = value;
                    this.topAppBarService.fetchNotificationsSubject.next(true);
                },
                error: err => {
                    this.toastr.error('Wystąpił problem z serwerem!')
                }
            }
        );
    }

    refresh() {
        this.complaintsService.fetchComplaints().pipe(map(page => page.results))
            .subscribe({
                next: value => {
                    this.complaints = value;
                }
            });
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
                    next: value => {
                        this.refresh();
                    },
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
