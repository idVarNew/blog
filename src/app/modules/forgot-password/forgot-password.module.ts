import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent} from './forgot-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, 
    NgbModule, 
    ReactiveFormsModule,
    ForgotPasswordRoutingModule
  ],
  declarations: [ForgotPasswordComponent ],
  exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {}
