import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from './register-payload';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + "signup", registerPayload);
  }
}