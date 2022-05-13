import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../services/post-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input () post: any;
  @Input ('i') i: any;
  @Input() totalPost: any;
  
  activeIdx: number = -1;
  commentLoading: boolean = false;
  comments: any = [];

  addStyle(i:number){
    this.getSingleComment(i+1);
    this.activeIdx = this.activeIdx != i ? i : -1;
  }
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  getSingleComment(id:number){
    this.commentLoading=true;
    this.postService.getSinglePostComment(id).subscribe(
      res => {
        this.comments = res;
        this.commentLoading = false;
      },
      error => {
        console.log(error);
        this.commentLoading = false;
      }
    )
  }

}
