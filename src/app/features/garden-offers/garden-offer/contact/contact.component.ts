import {Component, Input} from '@angular/core';
import {Contact} from "../../garden-offer.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() contact!: Contact
  @Input() edit: boolean = false;

}
