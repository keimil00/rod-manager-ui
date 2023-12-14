import {Injectable} from '@angular/core';
import {Post, TagDto} from "./post/post.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_ENDPOINTS} from "../../shared/config/api-endpoints.config";
import {Observable} from "rxjs";
import {Page} from "../../shared/paginator/page.model";

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  constructor(private httpClient: HttpClient) {
  }

  fetchPosts(index: number, size: number, tags: string[]): Observable<Page<Post>> {
    let params: HttpParams;
    if (tags.length === 0) {
      params = new HttpParams();
    } else {
      params = new HttpParams().set('tags', tags.concat().join(','));
    }
    params = params.append('page_size', size.toString())
    params = params.append('page', index.toString());
    return this.httpClient.get<Page<Post>>(API_ENDPOINTS.authenticated.createAnnouncement, {params}); // TODO: resolve authenticated/public situation
  }

  savePost(post: Post) {
    return this.httpClient.post<Post>(API_ENDPOINTS.authenticated.createAnnouncement, post);
  }

  getTags(): Observable<TagDto[]> {
    return this.httpClient.get<TagDto[]>(API_ENDPOINTS.public.getTags);
  }

  createTag(tag: string) {
    this.httpClient.post(API_ENDPOINTS.authenticated.createTag, {name: tag}).subscribe(
      {
        next: data => {
          console.log(data);
        },
        error: error => {
          console.error(error);
        }
      });
  }
}
