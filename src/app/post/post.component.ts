import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {AddPostService} from '../add-post.service';
import { CommentPayload } from '../add-post/comment-payload';
import {PostPayload} from '../add-post/post-payload';
import { CommentService } from '../comment.service';


// @ts-ignore
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: PostPayload;
  permaLink: Number;
  comment: String = '';
  username: String = '';
  listComment: any;
  commentPayload: CommentPayload;

  constructor(private router: ActivatedRoute, private postService: AddPostService, private commentService: CommentService, 
    private $localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink).subscribe((data:PostPayload) => {
      this.post = data;
    },(err: any) => {
      console.log('Failure Response');
    })

    this.getComment();

    console.log(this.$localStorage.retrieve('username')); 
  }

  getComment(){
    this.commentService.getComment(this.permaLink).subscribe(data => {
      this.listComment = data;
      console.log(this.listComment);
    },(err: any) => {
      console.log('Failure Response');
    })
  }

  submitComment(){  

    this.commentPayload = {
      postId: this.permaLink, 
      username: this.$localStorage.retrieve('username'),
      comment: this.comment
    }

    if(this.$localStorage.retrieve('username') == null){
      this.commentPayload.username = 'Anonymous';
    }

    this.commentService.addComment(this.commentPayload).subscribe(data => {
      console.log(data);
      this.getComment();
    },(err: any) => {
      console.log('Failure Response');
    })

    this.comment = '';
  }


}
