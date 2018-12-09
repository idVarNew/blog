
import { tap, map } from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostsService } from '../../../core/services/posts.service';
import { Store } from '@ngrx/store';
import * as AppActions from '../../../store/actions';
import { StoreModel, PostModel , CommentModel} from '../../../shared/models/index';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  posts: Array<PostModel>;
  sortedComments = [];
  postsWithComments = [];
  togglePanel: any = {};

  constructor(private store: Store<StoreModel>, private PostsService: PostsService) {}

  ngOnInit() {
    this.store
      .select('posts')
      .pipe(
        map((posts: Array<PostModel>) => {
          this.sortedComments.length =0
            posts.forEach((post: PostModel) => {
              if (post.comments.length > 0) {
                post.comments.forEach((item: CommentModel ) => {
                  this.postsWithComments.push({
                    id: post.id,
                    comment: item.comment,
                    publishDate: item.publishDate
                  });
                });
              }
            });

            this.sortedComments = this.postsWithComments.sort((a: PostModel, b: PostModel) => {
              return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
            });

          return posts;
        })
      )
      .subscribe((posts: Array<PostModel>) => {
        this.posts = posts;
      });
  }

  deleteComment(id: string, comment: string) {
    const commentToRemove: { id: string; comment: string } = { id, comment };
    this.store.dispatch(new AppActions.deleteComment(commentToRemove));

  }
}
