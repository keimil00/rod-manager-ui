import { Injectable } from '@angular/core';
import {Post} from "./post/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  posts: Post[] = [
    {title: 'Tytuł 1', content: 'Treść 1', tags: ['Ogłoszenia', 'Wydarzenia']},
    {title: 'Tytuł 2', content: 'Treść 2', tags: ['Ogłoszenia', 'Wydarzenia']},
    {title: 'Tytuł 3', content: 'Treść 3', tags: ['Ogłoszenia', 'Organizacja']},
    {title: 'Tytuł 4', content: 'Treść 4', tags: ['Środowisko', 'Wydarzenia']},
    {title: 'Tytuł 5', content: 'Treść 5', tags: ['Ogłoszenia', 'Wydarzenia']},
    {title: 'Tytuł 6', content: 'Treść 6', tags: ['Środowisko', 'Ciekawostki']},
    {title: 'Tytuł 7', content: 'Treść 7', tags: ['Ciekawostki', 'Wydarzenia']},
    {title: 'Tytuł 8', content: 'Treść 8', tags: ['Ogłoszenia', 'Wydarzenia']},
    {title: 'Tytuł 9', content: 'Treść 9', tags: ['Organizacja', 'Wydarzenia']},
    {title: 'Tytuł 10', content: 'Treść 10', tags: ['Ogłoszenia', 'Środowisko']},
  ];

  tags: string[] = ['Ogłoszenia', 'Wydarzenia', 'Środowisko', 'Ciekawostki', 'Organizacja', 'Inne'];

  loadedPosts: Post[] = this.posts;

  constructor() { }

  getPosts(index: number, size: number): Post[] {
    return this.loadedPosts.slice(index * size, index * size + size);
  }

  getTotalPostsCount(): number {
    return this.loadedPosts.length;
  }

  filterPostsByTags(selectedTags: string[]) {
    const postsContainingAllSelectedTags = this.getPostsContainingAllSelectedTags(selectedTags);
    const postsContainingAnySelectedTags = this.getPostsContainingAnySelectedTags(selectedTags);
    this.loadedPosts = postsContainingAllSelectedTags.concat(postsContainingAnySelectedTags);
  }

  private getPostsContainingAllSelectedTags(selectedTags: string[]) {
    return this.posts.filter(post => selectedTags.every(tag => post.tags.includes(tag)))
  }

  private getPostsContainingAnySelectedTags(selectedTags: string[]) {
    return this.posts.filter(post => selectedTags.some(tag => post.tags.includes(tag)))
  }

  savePost(post: Post) {
    this.loadedPosts.push(post);
  }

  getTags(): string[] {
    return this.tags;
  }

  createTag(tag: string) {
    this.tags.push(tag);
  }
}
