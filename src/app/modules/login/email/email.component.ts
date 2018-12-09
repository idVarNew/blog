import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @Input()
  loginForm: FormGroup;

  constructor() {}
  get emailControl() {
    return this.loginForm.get('email');
  }

  ngOnInit() {}
}
