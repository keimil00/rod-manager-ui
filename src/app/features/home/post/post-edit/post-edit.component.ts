import {Component, EventEmitter, Output} from '@angular/core';

// from the index, which exports a lot of useful modules
import BlotFormatter from 'quill-blot-formatter';
import Quill from "quill";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../post.model";
import {MatDialog} from "@angular/material/dialog";
import {TagDialogComponent} from "./tag-dialog/tag-dialog.component";

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent {
  @Output() save = new EventEmitter<Post>();
  @Output() cancel = new EventEmitter<void>();

  postForm: FormGroup;
  modules = {}
  addEvent = false;
  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      }
    }

    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: [''],
      tags: this.fb.array([]),
      event: this.fb.group({
        name: [''],
        date: [''],
      }),
    });
  }

  onSubmit() {
    console.log(this.postForm.value)
    this.save.emit(this.postForm.value);
  }

  onCancel() {
    console.log('cancel')
    this.cancel.emit();
  }

  openTagDialog() {
    const dialogRef = this.dialog.open(TagDialogComponent, {
      data: this.postForm,
      width: 'auto',
      height: 'auto',
      minWidth: '600px',
    });
  }

  toggleAddEvent() {
    console.log(!this.addEvent);
    this.addEvent = !this.addEvent;
    if (this.addEvent) {
      this.postForm.get('event')?.get('title')?.setValidators([Validators.required]);
      this.postForm.get('event')?.get('date')?.setValidators([Validators.required]);
    } else {
      this.postForm.get('event')?.get('title')?.clearValidators();
      this.postForm.get('event')?.get('date')?.clearValidators();
    }
  }
}
