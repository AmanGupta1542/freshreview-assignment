import { Component, OnInit } from '@angular/core';

import { PostService } from '../services/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "Post and it's comments";
  posts: any = [];
  totalPost: any = [];
  loading: boolean = false;
  constructor(private postService: PostService) { }


  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.loading=true;
    this.postService.getPosts().subscribe(
      res => {
        this.posts = res;
        this.loading = false;
        this.posts.map(
          (x:any) => {
              if(!this.arrayHasKey(x.userId)){
                this.totalPost.push({ userId : x.userId, postCount : 1 });
              }
              else{
                this.totalPost[x.userId-1].postCount++;
              } 
          }
        );
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    )
  }

  arrayHasKey(userid:any) {
    for(var i = 0; i < this.totalPost.length; i++) {
      if (this.totalPost[i].userId == userid) {
          return true;
      }
    }
    return false;
  }



}
