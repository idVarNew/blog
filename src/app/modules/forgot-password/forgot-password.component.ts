import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  visible = true;
  alertSuccess: string;
  alertError: string;

  constructor(private serviceAuth: AuthenticationService, private fb: FormBuilder) {}
  get emailControl() {
    return this.forgotPasswordForm.get('email');
  }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPassword(input) {
    this.serviceAuth
      .forgot(this.forgotPasswordForm.value.email)
      .then(resolve => {
        this.visible = false;
        this.alertSuccess = "Check your inbox for a password reset email. Click on the URL provided in the email and enter a new password."
     
     
      })
      .catch(error => {
        this.alertError = error.message;
      });
 //  
  }
}
