import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { PostModel } from 'src/app/shared/models/index';
import { Store } from '../../store/app.state';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  itemsRef$: AngularFireList<any>;
  key: string;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {}

  getUpdate(store) {
    const JSONPosts: string | number = JSON.stringify(store);
    if (this.key === undefined) {
      this.itemsRef$.push({ state: JSONPosts });
    } else {
      this.itemsRef$.update(this.key, { state: JSONPosts });
    }
  }

  getAllPosts(): Observable<Array<PostModel>> {
    this.itemsRef$ = this.af.list(`store/${'blog'}`);

    return this.itemsRef$.snapshotChanges().pipe(
      map((changes: Array<any>) => {
        const store = changes.map(item => {
          this.key = item.payload.key;
          return JSON.parse(item.payload.val().state);
        });

        return store.length > 0 ? store[0] : Store
      })
    );
  }
}
