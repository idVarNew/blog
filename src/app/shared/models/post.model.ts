import { PostImagesModel, CommentModel } from './index';

export class PostModel {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  labels: Array<string>;
  comments: Array<CommentModel>;
  likes: number;
  img: PostImagesModel;
}

export class NewPost {
  title: string;
  id: string;
  publishDate: string;
  description: { text: string };
  labels: Array<string>;
  img: PostImagesModel;
}
