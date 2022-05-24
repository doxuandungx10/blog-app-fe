import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {LoginPayload} from '../login-payload';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  submitted = false;
  loading = false;


  constructor(
    private authService: AuthService, 
    private router: Router,  
    private formBuilder: FormBuilder,
    private alertService: AlertService
    ) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
  });
    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      return;
  }

    this.loginPayload.username = this.f.username.value;
    this.loginPayload.password = this.f.password.value;

    this.authService.login(this.loginPayload).subscribe({
      next: () => {
          // get return url from query parameters or default to home page
          this.router.navigateByUrl('/home');
          console.log('login success');
      },
      error: error => {
        this.alertService.error(error);
        console.log('Login failed');
        this.loading = false;
        // this.router.navigateByUrl('/home');
      }
  });
  }
}
