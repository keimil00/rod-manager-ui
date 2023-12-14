import {ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {combineLatest, combineLatestWith, finalize, map, Observable, startWith, tap} from "rxjs";
import {FormControl} from "@angular/forms";
import {Post, Tag} from "./post/post.model";
import {PostDataService} from "./post-data.service";
import {PaginatorComponent} from "../../shared/paginator/paginator/paginator.component";
import {ToastrService} from "ngx-toastr";
import {Role} from "../register/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tagControl = new FormControl('');
  filteredTags: Observable<string[]>;
  allTags: string[] = [];
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild(PaginatorComponent) paginatorComponent!: PaginatorComponent;
  isCreatingPost = false;

  displayedTags: Tag[] = [];

  postsLoaded: Post[] = [];
  totalPostsCount: number = 0;
  readonly defaultPageSize = 10;
  currentPageIndex = 1;
  currentPageSize = this.defaultPageSize;

  constructor(private postDataService: PostDataService, private changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService ) {
    this.initData();
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  private initData() {
    this.fetchData(1, this.currentPageSize);
    this.postDataService.getTags()
      .pipe(
        finalize(() => {
          this.filteredTags = this.tagControl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
          );
        }))
      .subscribe(
        {
          next: data => {
            this.allTags = data.map(tag => tag.name);
            this.displayedTags = this.allTags.slice(0, 5).map(tag => ({name: tag, selected: false}));
          },
          error: error => {
            console.error(error);
          }
        }
      );
  }

  updateTagControl(input: Event) {
    this.tagControl.setValue((input.target as HTMLInputElement).value);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addTag(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  addTag(name: string): void {
    if (this.displayedTags.some(tag => tag.name === name)) {
      this.filterPostsByTags(this.displayedTags.find(tag => tag.name === name)!)
    } else {
      let tag: Tag = {name: name, selected: false};
      this.displayedTags.push(tag);
      this.filterPostsByTags(tag)
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  fetchData(pageIndex: number, pageSize: number): void {
    this.currentPageIndex = pageIndex;
    this.currentPageSize = pageSize;
    const filterTags = this.displayedTags.filter(tag => tag.selected).map(tag => tag.name);
    console.log(filterTags);
    this.postDataService.fetchPosts(pageIndex, pageSize, filterTags)
      .pipe(
        finalize(() => {
          this.changeDetectorRef.detectChanges();
        }))
      .subscribe(
        {
          next: data => {
            this.totalPostsCount = data.count;
            this.postsLoaded = data.results;
          },
          error: error => {
            console.error(error);
          }
        }
      );
  }

  filterPostsByTags(tag: Tag) {
    tag.selected = !tag.selected;
    this.paginatorComponent.reset();
    this.fetchData(1, this.currentPageSize);
  }

  createPost() {
    this.isCreatingPost = true;
  }

  onPostCreated(post: Post) {
    this.isCreatingPost = false;
    this.postDataService.savePost(post).subscribe({
      next: value => {
        this.initData();
      }
    });
  }

  onPostCreatingCancelled() {
    this.isCreatingPost = false;
  }

    protected readonly Role = Role;
}
