import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../core/services/posts.service';
import { Store } from '@ngrx/store';
import * as AppActions from '../../../store/actions';
import { StoreModel, PostModel } from 'src/app/shared/models/index';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Array<PostModel>;
  togglePanel: any = {};
  constructor(private store: Store<StoreModel>, private PostsService: PostsService) {}

  ngOnInit() {
    this.store.select('posts').subscribe((posts: Array<PostModel>) => {
      this.posts = posts;
    });
  }

  deletePost(id) {
    this.store.dispatch(new AppActions.deletePost(id));
  }
}
