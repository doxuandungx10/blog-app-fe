import { PostPayload } from './add-post/post-payload';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient) {

  }

  addPost(postPayload:PostPayload) {
    return this.httpClient.post('http://localhost:8080/api/posts', postPayload)
  }
}
