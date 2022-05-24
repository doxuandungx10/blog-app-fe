import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentPayload} from './add-post/comment-payload';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  addComment (commentPayload: CommentPayload){
    return this.httpClient.post('http://localhost:8080/api/comment/createComment', commentPayload);
  }

//   getAllComments(): Observable<Array<CommentPayload>>{
//     return this.httpClient.get<Array<CommentPayload>>("http://localhost:8080/api/posts/all");
//   }

  getComment(postId: Number):Observable<CommentPayload>{
    return this.httpClient.get<CommentPayload>('http://localhost:8080/api/comment/showAllComment/' + postId);
  }
}

