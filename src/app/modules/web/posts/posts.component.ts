import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel, PostModel } from 'src/app/shared/models/index';
import * as AppActions from '../../../store/actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit {
  @Input()
  posts: Array<PostModel> = [];
  @Input()
  postLikes: Array<PostModel> = [];
  p = 1;
  likes = 0;
 
  constructor(private store: Store<StoreModel>) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.store.select('posts').subscribe((posts: Array<PostModel>) => {
        if (this.posts.length === 0) {
          this.posts = posts;
        }
         this.postLikes = posts;
      });
    });
  }
  ngOnInit() {}

  likePost(postId: string) {
    this.store.dispatch(new AppActions.likePost(postId));
  }
}
