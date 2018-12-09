import { PostModel, StoreModel, SettingsModel } from '../shared/models/index';

export const initialSettings: SettingsModel = {
  blog: {
    title: '',
    description: '',
    author: ''
  }
};
export const initialPosts: Array<PostModel> = [];

export const Store: StoreModel = {
  posts: initialPosts,
  settings: initialSettings
};
