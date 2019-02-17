import { posts } from './../../../../testing/posts';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import * as AppActions from '../../../store/actions';
import { Store, select } from '@ngrx/store';
import { StoreModel, PostModel } from 'src/app/shared/models/index';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  posts: Array<PostModel> = [];
  postLikes: PostModel[];

  constructor(
    private activeRoute: ActivatedRoute, 
    private store: Store<StoreModel>) {}


  ngOnInit() {

   this.activeRoute.queryParams
    .pipe(
      switchMap(params => {
       
        return this.store.select('posts').pipe(
          map((posts: Array<PostModel>) => {
            return posts.filter((post: PostModel) => {
              if (post.labels.indexOf(params['label']) > -1) {
                return post;
              }
            });
          })
        );

      })
    )
    .subscribe((posts: Array<PostModel>)=> {
     
        this.posts = posts;
   
      this.postLikes = posts;
    });

  }
}
