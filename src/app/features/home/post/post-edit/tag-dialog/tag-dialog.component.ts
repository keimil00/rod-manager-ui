import {Component, ElementRef, inject, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostEditComponent} from "../post-edit.component";
import {FormControl, FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {finalize, map, Observable, startWith} from "rxjs";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {PostDataService} from "../../../post-data.service";

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(
    public dialogRef: MatDialogRef<PostEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
    private postDataService: PostDataService
  ) {
    this.tags = data.get('tags')!.value;
    this.fetchTags();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  fetchTags() {
    this.postDataService.getTags()
      .pipe(
        finalize(() => {
          this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
          );
        })
      ).subscribe(
      {
        next: data => {
          this.allTags = data.map(tag => tag.name);
        },
        error: error => {
          console.error(error);
        }
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
      if (!this.allTags.includes(value)) {
        this.postDataService.createTag(value);
        this.fetchTags();
      }
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.tags.includes(event.option.viewValue)) {
      this.tags.push(event.option.viewValue);
    }
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
