import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreModel, SettingsModel } from 'src/app/shared/models/index';
import * as AppActions from '../../../store/actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  settings: SettingsModel;
  constructor(private store: Store<StoreModel>, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.store.select('settings').subscribe((settings: SettingsModel) => {
      this.settings = settings;
    });

    this.settingsForm = this.fb.group({
      title: [this.settings.blog.title, [Validators.required, Validators.maxLength(80)]],
      description: [this.settings.blog.description, [Validators.required, Validators.maxLength(100)]],
      author: [this.settings.blog.author, [Validators.required, Validators.maxLength(30)]]
    });
  }
  onSubmit() {
    const newSettings = {
      ...this.settingsForm.value
    };
    this.store.dispatch(new AppActions.editSettings(newSettings));
    this.router.navigate(['/admin']);
  }
}
