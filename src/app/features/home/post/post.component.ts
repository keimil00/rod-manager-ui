import {Component, Input} from '@angular/core';
import {Post} from "./post.model";
import Quill from 'quill';

// from the index, which exports a lot of useful modules
import BlotFormatter from 'quill-blot-formatter';
import {DomSanitizer} from "@angular/platform-browser";
Quill.register('modules/blotFormatter', BlotFormatter);


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post!: Post;
  postContent: string = '';
  title = 'angular-quill-example-app';

  blured = false
  focused = false
  modules = {}

  sanitizer: DomSanitizer;

  constructor(sanitizer: DomSanitizer) {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      },
    }
    this.sanitizer = sanitizer;
  }

  protected readonly console = console;
}
