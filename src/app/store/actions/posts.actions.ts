import { Action } from '@ngrx/store';
import { PostModel, NewPost } from '../../shared/models/index';

export const ADD_NEW_POST = '[posts] ADD NEW POST';
export const DELETE_POST = '[posts] DELETE_POST';
export const ADD_NEW_LABELS = '[posts] ADD NEW LABELS';
export const LOAD_INITIAL_POSTS = '[posts] LOAD INITIAL POSTS';
export const EDIT_POST = '[posts] EDIT_POST';
export const EDIT_LABELS = '[posts] EDIT_LABELS';
export const REMOVE_LABEL = '[posts] REMOVE_LABEL';
export const LOAD = '[posts] LOAD';
export const ADD_COMMENT = '[posts] ADD COMMENT';
export const DELETE_COMMENT = '[posts] DELETE_COMMENT';
export const DELETE_POST_IMAGE = '[posts] DELETE_POST_IMAGE';
export const LIKE_POST = '[posts] LIKE_POST';



export class loadPosts implements Action {
  readonly type = LOAD;
}

export class loadInitialPosts implements Action {
  readonly type = LOAD_INITIAL_POSTS;
  constructor(public payload: Array<PostModel>) {}
}

export class addNewPost implements Action {
  readonly type = ADD_NEW_POST;
  constructor(public payload: NewPost) {}
}

export class deletePost implements Action {
  readonly type = DELETE_POST;
  constructor(public payload: string) {}
}

export class removeLabel implements Action {
  readonly type = REMOVE_LABEL;
  constructor(public payload: { id; label }) {}
}

export class editPost implements Action {
  readonly type = EDIT_POST;
  constructor(public payload: { id: string; post: NewPost }) {}
}

export class editLabels implements Action {
  readonly type = EDIT_LABELS;
  constructor(public payload: PostModel) {}
}

export class addComment implements Action {
  readonly type = ADD_COMMENT;
  constructor(public payload) {
  }
}

export class deleteComment implements Action {
  readonly type = DELETE_COMMENT;
  constructor(public payload: { id: string; comment: string }) {}
}

export class deletePostImage implements Action {
  readonly type = DELETE_POST_IMAGE;
  constructor(public payload: { imageToDelete: any; postId: string }) {}
}

export class likePost implements Action {
  readonly type = LIKE_POST;
  constructor(public payload : string) {}
}



export type PostsActions =
  | addNewPost
  | removeLabel
  | loadInitialPosts
  | loadPosts
  | editPost
  | editLabels
  | deletePost
  | addComment
  | deleteComment
  | deletePostImage
  | likePost;
