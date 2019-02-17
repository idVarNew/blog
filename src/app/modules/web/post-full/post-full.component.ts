
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, tap, map } from 'rxjs/operators';
import * as AppActions from '../../../store/actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StoreModel, PostModel } from 'src/app/shared/models/index';

import { PostFullService } from './post-full.services';

@Component({
  selector: 'app-post-full',
  templateUrl: './post-full.component.html',
  styleUrls: ['./post-full.component.scss']
})
export class PostFullComponent implements OnInit {
  commentsForm: FormGroup;
  post: PostModel;
  posts: Array<PostModel> =[];
  randomPostsList: Array<PostModel> = [];
  postIndex: number;
  postsEnds: boolean = true;
  postsStarts: boolean;
  imagesEnds: boolean;
  imagesStarts: boolean;
  imgIndex = 0;
  postComments: PostModel;

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<StoreModel>,
    private router: Router,
    private fb: FormBuilder,
    private postFullService: PostFullService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.activeRoute.paramMap
      .pipe(
        switchMap((param: ParamMap) => {
          return this.store.select('posts').pipe(
            tap((posts: Array<PostModel>) => {
              if (posts.length > 0) {
                this.posts = posts;
              }
            }),
            map((posts: Array<PostModel>) => {
              return posts.filter((post: PostModel, i) => {
                if (post.id === param.get('id')) {
                  this.postIndex = i;
                  if (i === 0) {
                    this.postsStarts = true;
                  }
                  if (i === posts.length - 1) {
                    this.postsEnds = true;
                  }
                  if (this.randomPostsList.length === 0) {
                   this.randomPosts(posts, post);
                  }
                  return post;
                }
              })[0];
            })
          );
        })
      )
      .subscribe((post: PostModel) => {
        this.post = post;
        this.postComments = post;
      });

    
  }



  randomPosts(posts: Array<PostModel>, currentPost: PostModel) {
    const randomPostsSorted: Array<PostModel> = this.postFullService.getSortedRandomPosts(posts, currentPost);

    if (randomPostsSorted.length >= 3) {
      this.randomPostsList = randomPostsSorted.filter((post, index) => {
        if (index < 3) {
          return post;
        }
      });
    } else {
      this.randomPostsList = randomPostsSorted;
    }
  }

  submit(comment: { author: string; comment: string }) {
    const publishDate: number = Date.parse(new Date() + ''),
      newComment = { id: this.post.id, comment: comment.comment, publishDate, author: comment.author };
    this.store.dispatch(new AppActions.addComment(newComment));

    this.commentsForm.reset();
  }

  filterByLabel(label: string): void {
    this.router.navigate(['/search'], { queryParams: { label: label } });
  }

  nextPost() {
    const index: number = this.postIndex + 1;
    this.getPost(index, this.postsStarts);
  }

  prevPost() {
    const index: number = this.postIndex - 1;
    this.getPost(index, this.postsEnds);
  }

  nextImage() {
    if (this.post.img.large[this.imgIndex + 1]) {
      this.imgIndex = this.imgIndex + 1;
      this.imagesEnds = false;
    } else {
      this.imagesEnds = true;
    }
  }
  prevImage() {
    if (this.post.img.large[this.imgIndex - 1]) {
      this.imgIndex = this.imgIndex - 1;
      this.imagesStarts = false;
    } else {
      this.imagesStarts = true;
    }
  }

  private getPost(index: number, direction: boolean) {
    if (this.posts[index] !== undefined) {
      direction = true;
      this.router.navigate(['/posts', this.posts[index].id]);
    } else {
      direction = false;
    }
  }

  likePost(postId: string) {
    this.store.dispatch(new AppActions.likePost(postId));
  }



}


/*

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, tap, map } from 'rxjs/operators';
import * as AppActions from '../../../store/actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StoreModel, PostModel } from 'src/app/shared/models/index';

import { PostFullService } from './post-full.services';

@Component({
  selector: 'app-post-full',
  templateUrl: './post-full.component.html',
  styleUrls: ['./post-full.component.scss']
})
export class PostFullComponent implements OnInit {
  commentsForm: FormGroup;
  post: PostModel;
  posts: Array<PostModel>;
  randomPostsList: Array<PostModel> = [];
  postIndex: number;
  postsEnds: boolean;
  postsStarts: boolean;
  imagesEnds: boolean;
  imagesStarts: boolean;
  imgIndex = 0;
  postComments: PostModel;

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<StoreModel>,
    private router: Router,
    private fb: FormBuilder,
    private postFullService: PostFullService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.activeRoute.paramMap
      .pipe(
        switchMap((param: ParamMap) => {
          return this.store.select('posts').pipe(
            tap((posts: Array<PostModel>) => {
              if (posts.length > 0) {
                this.posts = posts;
              }
            }),
            map((posts: Array<PostModel>) => {
              return posts.filter((post: PostModel, i) => {
                if (post.id === param.get('id')) {
                  this.postIndex = i;
                  if (i === 0) {
                    this.postsStarts = true;
                  }
                  if (i === posts.length - 1) {
                    this.postsEnds = true;
                  }
                  if (this.randomPostsList.length === 0) {
                    this.randomPosts(posts, post);
                  }
                  return post;
                }
              })[0];
            })
          );
        })
      )
      .subscribe((post: PostModel) => {
        this.post = post;
        this.postComments = post;
      });

    this.commentsForm = this.fb.group({
      author: ['', [Validators.required, Validators.maxLength(50)]],
      comment: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  randomPosts(posts: Array<PostModel>, currentPost: PostModel) {
    const randomPostsSorted: Array<PostModel> = this.postFullService.getSortedRandomPosts(posts, currentPost);

    if (randomPostsSorted.length >= 3) {
      this.randomPostsList = randomPostsSorted.filter((post, index) => {
        if (index < 3) {
          return post;
        }
      });
    } else {
      this.randomPostsList = randomPostsSorted;
    }
  }

  submit(comment: { author: string; comment: string }) {
    const publishDate: number = Date.parse(new Date() + ''),
      newComment = { id: this.post.id, comment: comment.comment, publishDate, author: comment.author };
    this.store.dispatch(new AppActions.addComment(newComment));

    this.commentsForm.reset();
  }

  filterByLabel(label: string): void {
    this.router.navigate(['/search'], { queryParams: { label: label } });
  }

  nextPost() {
    const index: number = this.postIndex + 1;
    this.getPost(index, this.postsStarts);
  }

  prevPost() {
    const index: number = this.postIndex - 1;
    this.getPost(index, this.postsEnds);
  }

  nextImage() {
    if (this.post.img.large[this.imgIndex + 1]) {
      this.imgIndex = this.imgIndex + 1;
      this.imagesEnds = false;
    } else {
      this.imagesEnds = true;
    }
  }
  prevImage() {
    if (this.post.img.large[this.imgIndex - 1]) {
      this.imgIndex = this.imgIndex - 1;
      this.imagesStarts = false;
    } else {
      this.imagesStarts = true;
    }
  }

  private getPost(index: number, direction: boolean) {
    if (this.posts[index] !== undefined) {
      direction = true;
      this.router.navigate(['/posts', this.posts[index].id]);
    } else {
      direction = false;
    }
  }

  likePost(postId: string) {
    this.store.dispatch(new AppActions.likePost(postId));
  }
}


*/