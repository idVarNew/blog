import { Component, OnInit, Renderer2, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngrx/store';
import { SettingsModel, StoreModel } from '../../shared/models/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
  isLogIn: boolean;
  blogSettings: {
    title: string;
    description: string;
    author: string;
  };

  constructor(
    private serviceAuth: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private store: Store<StoreModel>
  ) {}

  ngOnInit() {
    this.store.select('settings').subscribe((settings: SettingsModel) => {
      this.blogSettings = settings.blog;
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
}
