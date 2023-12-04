import {Component, EventEmitter, Input, Output, Sanitizer, ViewChild} from '@angular/core';
import {GardenInfo, GardenOffer, GardenOfferCreate} from "../garden-offer.model";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Quill from "quill";
import BlotFormatter from "quill-blot-formatter";
import {Post} from "../../home/post/post.model";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-garden-offer',
  templateUrl: './garden-offer.component.html',
  styleUrls: ['./garden-offer.component.scss']
})
export class GardenOfferComponent {
  @Input() offer?: GardenOffer;
  @Input() edit: boolean = false;
  @Output() save = new EventEmitter<GardenOfferCreate>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild(OfferDetailsComponent) offerDetailsComponent?: OfferDetailsComponent;
  offerForm: FormGroup;
  modules = {}


  constructor(public sanitizer: DomSanitizer, private fb: FormBuilder) {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      }
    }
    console.log(JSON.stringify(this.offer));
    this.offerForm = this.fb.group({
      title: ['', Validators.required],
      body: [''],
      contact_id: [null]
    });
  }

  updateContact($event: string) {
    console.log('Contact: ' + $event);
    this.offerForm.patchValue({contact_id: $event});
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    const gardenOffer: GardenOfferCreate = {
      title: this.offerForm.get('title')?.value,
      body: this.offerForm.get('body')?.value,
      contact_id: this.offerForm.get('contact_id')?.value,
      garden_info: this.offerDetailsComponent!.retrieveGardenInfo()
    }
    this.save.emit(gardenOffer);
  }
}
