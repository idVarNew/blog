import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<firebase.User>;
  userEmail: string;
  email: string;
  password: string;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;

    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  forgot(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
