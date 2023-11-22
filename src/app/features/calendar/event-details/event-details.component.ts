import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CalendarComponent} from "../calendar.component";
import {Post} from "../../home/post/post.model";
import {CalendarService} from "../calendar.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  post$: Observable<Post>;

  constructor(
    public dialogRef: MatDialogRef<CalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private calendarService: CalendarService
  ) {
    this.post$ = calendarService.fetchPost(data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
