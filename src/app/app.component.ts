import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppActions from './store/actions';
import { StoreModel } from './shared/models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<StoreModel>) {}

  ngOnInit() {
    this.store.dispatch(new AppActions.loadPosts());
  }
}
