import * as AppActions from '../actions';
import { Store } from '../app.state';

export function Settings(state = Store.settings, action: AppActions.ActionsSettings) {
  switch (action.type) {
    case AppActions.LOAD_SETTINGS:
      return action.payload['settings'];
    case AppActions.CHANGE_SETINGS:
      return {
        blog: {
          title: action.payload.title,
          description: action.payload.description,
          author: action.payload.author
        }
      };

    default:
      return state;
  }
}
