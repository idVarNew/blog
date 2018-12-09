import { Action } from '@ngrx/store';

export const CHANGE_SETINGS = '[settings] CHANGE_SETINGS';
export const LOAD_SETTINGS = '[settings] LOAD_SETTINGS';

export class loadSettings implements Action {
  readonly type = LOAD_SETTINGS;
  constructor(public payload) {}
}

export class editSettings implements Action {
  readonly type = CHANGE_SETINGS;
  constructor(public payload) {
  
  }
}

export type ActionsSettings = editSettings | loadSettings
