import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from './register-payload';
import { LoginPayload } from './login-payload';
import { JwtAuthResponse } from './jwt-auth-response';
import {LocalStorageService} from 'ngx-webstorage';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = "http://localhost:8080/";

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + "signup", registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean>{
    return this.httpClient.post<JwtAuthResponse>(this.url + "signin", loginPayload).pipe(map(data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);
      return true
    }))
  }
}
