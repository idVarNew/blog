import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './store/app.effects';
import { AppComponent } from './app.component';

import { reducers } from './store/reducers/reducers';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyBGKmVtyNPpKfU7Cptn4DcGzm_NmjSx_8o',
    authDomain: 'photos-93ec1.firebaseapp.com',
    databaseURL: 'https://photos-93ec1.firebaseio.com',
    projectId: 'photos-93ec1',
    storageBucket: 'photos-93ec1.appspot.com',
    messagingSenderId: '361402858767'
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    EffectsModule.forRoot([Effects]),
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
