import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarView} from "angular-calendar";
import {CalendarService} from "./calendar.service";
import {GardenEvent} from "./event.model";
import {map, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {EventDetailsComponent} from "./event-details/event-details.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();


  events$!: Observable<CalendarEvent<number>[]>;

  constructor(private calendarService: CalendarService, public dialog: MatDialog) {
    this.fetchEvents()
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.events$ = this.calendarService.fetchEvents(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1)
      .pipe(
        map(
          value => value.map(event => this.mapEventToCalendarEvent(event))
        )
      )
  }

  private mapEventToCalendarEvent(event: GardenEvent): CalendarEvent {
    console.log(event);
    return {
      start: new Date(event.date),
      end: new Date(event.date),
      title: event.name,
      color: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
      },
      meta: event.related_announcement
    };
  }

  openDialog(event: CalendarEvent): void {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
      data: event.meta,
      width: '60%',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
