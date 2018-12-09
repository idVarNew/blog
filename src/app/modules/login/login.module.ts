import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  imports: [
    CommonModule, 
    NgbModule, 
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent, EmailComponent, PasswordComponent ],
  exports: [LoginComponent]
})
export class LoginModule {}
