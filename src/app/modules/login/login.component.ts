import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  isLogIn: boolean;
  email: string;
  password: string;
  messageError = '';
  visible = false;
  userEmail = '';
  loginForm: FormGroup;
  spinner = false;

  constructor(
    private fb: FormBuilder,
    private serviceAuth: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngAfterViewChecked() {
    if (localStorage.getItem('userBlogApp') === 'true') {
      this.isLogIn = true;
    } else {
      this.isLogIn = false;
    }
    this.cdr.detectChanges();
  }

  signIn() {
    this.spinner = true;
    const email = this.loginForm.value.email,
      password = this.loginForm.value.password;
    if (email === 'sample@sampleblog.com') {
      this.serviceAuth
        .login({ email, password })
        .then(resolve => {
          localStorage.setItem('userBlogApp', 'true');
          this.router.navigate(['admin']);
        })
        .catch(error => {
          this.spinner = false;
          if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            this.messageError = 'Wrong email or password';
          } else {
            this.messageError = error.message;
          }
        });
    }else{
      this.spinner = false;
      this.messageError = "This is a demo version. Please use this email: sample@sampleblog.com to login"
    }
  }
}
