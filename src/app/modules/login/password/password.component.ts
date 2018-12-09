import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @Input()
  loginForm: FormGroup;
  constructor() {}

  get passwordControl() {
    return this.loginForm.get('password');
  }
  ngOnInit() {}
}
