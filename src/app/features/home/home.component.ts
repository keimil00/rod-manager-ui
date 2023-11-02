import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {Post, Tag} from "./post/post.model";
import {PostDataService} from "./post-data.service";
import {PaginatorComponent} from "../../shared/paginator/paginator/paginator.component";

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

  defaultTags: Tag[] = [
    {name: 'Ogłoszenia', selected: false},
    {name: 'Wydarzenia', selected: false},
    {name: 'Środowisko', selected: false},
    {name: 'Ciekawostki', selected: false},
    {name: 'Organizacja', selected: false}
  ];

  postsLoaded: Post[] = [];
  totalPostsCount: number;
  pageSize = 2;

  constructor(private postDataService: PostDataService) {
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
    this.totalPostsCount = this.postDataService.getTotalPostsCount();
    this.initData();
    this.allTags = this.postDataService.getTags();
  }

  private initData() {
    this.postsLoaded = this.postDataService.getPosts(0, this.pageSize);
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
    if (this.defaultTags.some(tag => tag.name === name)) {
      this.filterPostsByTags(this.defaultTags.find(tag => tag.name === name)!)
    } else {
      let tag: Tag = {name: name, selected: false};
      this.filterPostsByTags(tag)
      this.defaultTags.push(tag);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  fetchData(pageIndex: number, pageSize: number): any[] {
    return this.postDataService.getPosts(pageIndex, pageSize);
  }

  onNewDataLoaded(data: any[]) {
    this.postsLoaded = data;
  }

  filterPostsByTags(tag: Tag) {
    tag.selected = !tag.selected;
    const selectedTags = this.defaultTags.filter(tag => tag.selected);
    if (selectedTags.length === 0) this.postsLoaded = this.postDataService.getPosts(0, this.pageSize);
    this.postDataService.filterPostsByTags(selectedTags.map(tag => tag.name));
    this.paginatorComponent.reset();
    this.initData();
  }

  createPost() {
    this.isCreatingPost = true;
  }

  onPostCreated(post: Post) {
    this.isCreatingPost = false;
    this.postDataService.savePost(post);
    this.refresh();
  }

  refresh() {
    this.totalPostsCount = this.postDataService.getTotalPostsCount();
    this.initData();
    this.allTags = this.postDataService.getTags();
    this.tagControl.setValue(null);
  }

  onPostCreatingCancelled() {
    this.isCreatingPost = false;
  }

}
