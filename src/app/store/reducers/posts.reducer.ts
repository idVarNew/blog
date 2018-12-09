import * as AppActions from '../actions';
import { Store } from '../app.state';
import { PostModel } from '../../shared/models/post.model';

export function Posts(state = Store.posts, action: AppActions.PostsActions) {
  switch (action.type) {
    case AppActions.LOAD_INITIAL_POSTS:
      return [].concat(action.payload['posts']);

    case AppActions.ADD_NEW_POST:
      return [
        {
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          publishDate: action.payload.publishDate,
          labels: action.payload.labels,
          comments: [],
          likes: 0,
          img: Object.assign({}, action.payload.img)
        },
        ...state
      ];

    case AppActions.EDIT_POST:

      return state.map((post: PostModel) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            title: action.payload.post.title,
            description: action.payload.post.description,
            labels: action.payload.post.labels,
            img: Object.assign({}, action.payload.post.img)
          };
        } else {
          return post;
        }
      });
    case AppActions.REMOVE_LABEL:
      return state.map((post: PostModel) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            labels: post.labels.filter((label: string) => {
              return label !== action.payload.label;
            })
          };
        } else {
          return post;
        }
      });
    case AppActions.ADD_COMMENT:
      return state.map((post: PostModel) => {
        if (post.id + '' === action.payload.id + '') {
          return {
            ...post,
            comments: [
              {
                comment: action.payload.comment,
                publishDate: action.payload.publishDate,
                author: action.payload.author
              },
              ...post.comments
            ]
          };
        } else {
          return post;
        }
      });
    case AppActions.DELETE_COMMENT:
   
      return state.map((post: PostModel) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            comments: post.comments.filter(comment => {
              return comment.comment !== action.payload.comment;
            })
          };
        } else {
          return post;
        }
      });

    case AppActions.DELETE_POST:
      return state.filter((post: PostModel) => {
        return post.id !== action.payload;
      });
    case AppActions.SET_COVER_PHOTO:
      return state

    case AppActions.DELETE_POST_IMAGE:
      return state.map((post: PostModel) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            img: action.payload.imageToDelete
          };
        } else {
          return post;
        }
      });
      case AppActions.LIKE_POST:
      return state.map((post: PostModel) => {
        if (post.id === action.payload) {
          return {
            ...post,
            likes: post.likes + 1
          };
        } else {
          return post;
        }
      });
    default:
      return state;
  }
}
