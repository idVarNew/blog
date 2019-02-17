import { Posts } from './posts.reducer';
import { initialPosts } from '../app.state';
import * as PostsActions from '../actions/posts.actions';
import { newPost } from 'src/testing/post';

describe('Posts reducers', () => {
  it('should add a post', () => {
    const initialState = initialPosts;

    expect(initialState.length).toBe(0);

    const action = new PostsActions.addNewPost(newPost);
    const state = Posts(initialState, action);
 
    expect(state.length).toBe(1);
    expect(state[0].id).toEqual(newPost.id);
  });

  it('should edit a post', () => {
    const newtitle = 'I love summer';

    const previousState = [Object.assign(newPost, { likes: 0, comments: [], description: 'I hate this!' })];

    expect(previousState.length).toBe(1);

    const action = new PostsActions.editPost({ id: '_5my2l15b9', post: Object.assign(newPost, { title: newtitle }) });
    const state = Posts(previousState, action);

    expect(state.length).toBe(1);
    expect(state[0].title).toBe(newtitle);
  });

  it('should remove a label', () => {
    const previousState = [
      Object.assign(newPost, { likes: 0, comments: [], description: 'I hate this!', labels: ['garden'] })
    ];

    expect(previousState[0].labels.length).toBe(1);

    const action = new PostsActions.removeLabel({ id: '_5my2l15b9', label: 'garden' });
    const state = Posts(previousState, action);

    expect(state[0].labels.length).toBe(0);
  });

  it('should add a comment', () => {
    const newComment = 'This is a new comment';

    const previousState = [
      Object.assign(newPost, { likes: 0, comments: [], description: 'I hate this!', labels: ['garden'] })
    ];

    expect(previousState[0].comments.length).toBe(0);

    const action = new PostsActions.addComment({
      id: '_5my2l15b9',
      comment: newComment,
      publishDate: '2018-12-09T22:37:11.137Z',
      author: 'Me'
    });
    const state = Posts(previousState, action);
    expect(state[0].comments.length).toBe(1);
    expect(state[0].comments[0].comment).toBe(newComment);
  });

  it('should delete a comment', () => {
    const newComment = 'This is a new comment';

    const previousState = [
      Object.assign(newPost, {
        likes: 0,
        comments: [{ comment: newComment, publishDate: '2018-12-09T22:37:11.137Z', author: 'Me' }],
        description: 'I hate this!'
      })
    ];
    expect(previousState[0].comments.length).toBe(1);

    const action = new PostsActions.deleteComment({ id: '_5my2l15b9', comment: 'This is a new comment' });
    const state = Posts(previousState, action);

    expect(state[0].comments.length).toBe(0);
  });

  it('should delete a comment', () => {
    const newComment = 'This is a new comment';

    const previousState = [
      Object.assign(newPost, {
        likes: 0,
        comments: [],
        description: 'I hate this!'
      })
    ];
    expect(previousState.length).toBe(1);

    const action = new PostsActions.deletePost('_5my2l15b9');
    const state = Posts(previousState, action);

    expect(state.length).toBe(0);
  });

  it('should delete an image', () => {
    const imageToDelete = {};

    const previousState = [
      Object.assign(newPost, {
        likes: 0,
        comments: [],
        description: 'I hate this!'
      })
    ];

    const action = new PostsActions.deletePostImage({ imageToDelete, postId: '_5my2l15b9' });

    const state = Posts(previousState, action);

    expect(state[0].img).toEqual(imageToDelete);
  });

  it('add a like', () => {
    const previousState = [
      Object.assign(newPost, {
        likes: 0,
        comments: [],
        description: 'I hate this!'
      })
    ];
    expect(previousState[0].likes).toEqual(0);

    const action = new PostsActions.likePost('_5my2l15b9');

    const state = Posts(previousState, action);

    expect(state[0].likes).toEqual(1);
  });
});
