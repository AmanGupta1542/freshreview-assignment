import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Post and it's comments";
  activeIdx: number = -1;
  posts: any = [];
  comments: any = [];
  count : any = '';
  totalPost: any = [];
  user: number = 0;
  found:boolean = false;
  loading: boolean = false;
  commentLoading: boolean = false;
  constructor(private postService: PostService) { }

  addStyle(i:number){
    this.getSingleComment(i+1);
    this.activeIdx = this.activeIdx != i ? i : -1;
  }

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

  getSingleComment(id:number){
    this.commentLoading=true;
    this.postService.getSinglePostComment(id).subscribe(
      res => {
        this.comments = res;
        this.commentLoading = false;
      }
    )
  }

  // getComments(){
  //   this.postService.getComments().subscribe(
  //     res => {
  //       this.comments = res;
  //     }
  //   )
  // }
}
