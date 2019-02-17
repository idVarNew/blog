import { CHANGE_SETINGS, LOAD_SETTINGS } from '../actions/index';
import { Settings } from './settings.reducer';
import { initialSettings } from '../app.state';
import * as ActionsSettings from '../actions/settings.actions';
import { Action } from '@ngrx/store';


describe('Setting reducers', () => {

    it('should add new settings', () => {
      const newSettings = {
          title: 'Blog',
          description: 'new blog',
          author: 'Me'
        };

      const initialState = initialSettings;
      const action = new ActionsSettings.editSettings(newSettings);
      const state = Settings(initialState, action);
      expect(state.blog).toEqual(newSettings);
    });

});
