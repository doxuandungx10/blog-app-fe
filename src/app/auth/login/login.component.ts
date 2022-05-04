import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginPayload } from '../login-payload';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginPayload: LoginPayload
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
    this.loginPayload = {
      username:'',
      password: ''
    }
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loginPayload.username = this.loginForm.get('username')?.value;
    this.loginPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginPayload).subscribe({
      next: (data) => {
        if(data) {
          console.log('login success');
          this.router.navigateByUrl('/home')
        } else {
          console.log('login failed');
        }
      },
      error: (e) => {
        console.error('register failed')
      }
    });
    // this.authService.register(this.registerPayload).subscribe ( data => {
    //   console.log('register success');
    //   this.router.navigateByUrl( url: '/register-success');
    // }, error =>{
    //   console.log('register failed');
    // });
  }
}
