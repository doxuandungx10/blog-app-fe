import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostPayload } from '../add-post/post-payload';
import { AddPostService } from '../add-post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Observable<Array<PostPayload>> | undefined;
  constructor(private postService: AddPostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts();
  }

}
