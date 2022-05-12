import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = "https://jsonplaceholder.typicode.com/";
  constructor(@Inject(HttpService) public http: HttpService) { }

  getPosts() {
    return this.http.get(this.url + 'posts');
  }

  getComments() {
    return this.http.get(this.url + 'comments');
  }

  getSinglePostComment(id: number){
    return this.http.get(this.url +'/'+id +'/comments');
  }
}
