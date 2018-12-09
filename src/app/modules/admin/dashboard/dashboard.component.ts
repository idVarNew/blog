import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel, PostModel, CommentModel } from 'src/app/shared/models/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts: Array<PostModel>;
  allComments: Array<CommentModel> = [];
  sortedComments: Array<CommentModel>;

  constructor(private store: Store<StoreModel>) {}

  ngOnInit() {
    this.store.select('posts').subscribe((posts: Array<PostModel>) => {
      this.posts = posts;

      posts.map(post => {
        this.allComments = this.allComments.concat(post.comments);
      });

      this.sortedComments = this.allComments.sort((a, b) => {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });
    });
  }
}
