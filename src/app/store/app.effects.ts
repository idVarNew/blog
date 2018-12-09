import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { PostsService } from '../core/services/posts.service';
import { switchMap, map, catchError, withLatestFrom, tap, concatMap } from 'rxjs/operators';
import * as AppActions from './actions/index';
import { Store, Action } from '@ngrx/store';
import { PostModel, StoreModel } from '../shared/models/index';


@Injectable({
  providedIn: 'root'
})
export class Effects {
  constructor(private actions$: Actions, private store: Store<StoreModel>, private postsService: PostsService) {}

  @Effect()
  getPosts$ = this.actions$.pipe(
    ofType(AppActions.LOAD),
    withLatestFrom(this.store, (action: Action, store: StoreModel) => store),
    switchMap(() => {
      return this.postsService.getAllPosts().pipe(
        map((store: Array<PostModel>) => {
          this.store.dispatch(new AppActions.loadSettings(store));
          return new AppActions.loadInitialPosts(store);
        }),
        catchError(error => error)
      );
    })
  );

  @Effect({ dispatch: false })
  updatePosts$ = this.actions$.pipe(
    ofType(
      AppActions.ADD_NEW_POST,
      AppActions.CHANGE_SETINGS,
      AppActions.EDIT_POST,
      AppActions.REMOVE_LABEL,
      AppActions.ADD_COMMENT,
      AppActions.DELETE_COMMENT,
      AppActions.DELETE_POST_IMAGE,
      AppActions.SET_COVER_PHOTO,
      AppActions.DELETE_POST,
      AppActions.LIKE_POST
    ),
    withLatestFrom(this.store, (action: Action, store: StoreModel) => store),
    map((store: StoreModel) => {
      this.postsService.getUpdate(store);
    })
  );
}
