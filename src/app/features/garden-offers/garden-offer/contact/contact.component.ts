import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "../../garden-offer.model";
import {Observable} from "rxjs";
import {GardenOffersService} from "../../garden-offers.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() contact?: Contact
  @Input() edit: boolean = false;
  possibleContacts$?: Observable<Contact[]>;
  selectedContactId: string = '';
  @Output() contactEmitter = new EventEmitter<string>();

  constructor(private gardenOffersService: GardenOffersService) {}

  ngOnInit(): void {
    console.log('Edit: ' + this.edit);
    if (this.edit) {
      console.log('Fetching... ');
      this.fetchPossibleContacts();
    }
  }

  fetchPossibleContacts() {
    this.possibleContacts$ = this.gardenOffersService.fetchManagers()
  }

  selectionChange() {
    console.log('Selection change: ' + this.selectedContactId)
    this.contactEmitter.emit(this.selectedContactId);
  }
}
