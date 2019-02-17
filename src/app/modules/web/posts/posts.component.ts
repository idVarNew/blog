
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
  
  constructor(private store: Store<StoreModel>) {}

  ngAfterViewInit() {
  
  }
  ngOnInit() {
    this.store.select('posts').subscribe((posts: Array<PostModel>) => {

      if(this.posts.length ===0){
       this.posts = posts;
            }    
  
    //    this.postLikes = posts;
            
        });
  }


  likePost(postId: string) {
    this.store.dispatch(new AppActions.likePost(postId));
  }
}

/*
import { Component, OnInit, AfterViewInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel, PostModel } from 'src/app/shared/models/index';
import * as AppActions from '../../../store/actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit , OnChanges{
  @Input()
  posts: Array<PostModel> = [];
  @Input()
  postLikes: Array<PostModel> = [];
  p = 1;
current = []
  constructor(private store: Store<StoreModel>) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.posts.currentValue)
    if(changes.posts.currentValue.length > 0){
      this.current = changes.posts.currentValue

    }
  }
  ngAfterViewInit() {}
  
  ngOnInit() {
    if(this.current.length === 0){
     
      this.store.select('posts').subscribe((posts: Array<PostModel>) => {
        if (this.posts) {
          this.posts = posts;
          this.postLikes = posts;
          console.log(800200)
        }
    
      });
    }else{
      this.posts = this.current
    }
  
  }

  likePost(postId: string) {
    this.store.dispatch(new AppActions.likePost(postId));
  }
}
*/
/*

import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel, PostModel } from 'src/app/shared/models/index';
import * as AppActions from '../../../store/actions';
import { tap } from 'rxjs/operators';

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
active = true

  constructor(private store: Store<StoreModel>) {}

  ngAfterViewInit() {

    setTimeout(() => {
      this.store.select('posts').subscribe((posts: Array<PostModel>) => {
        if(this.posts){
          this.posts = posts; 
             
         this.postLikes = posts;
        }  
      });
    });
  }
  ngOnInit() {}

  likePost(postId: string) {
    this.store.dispatch(new AppActions.likePost(postId));
  }
}


*/
/*
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel, PostModel } from 'src/app/shared/models/index';
import * as AppActions from '../../../store/actions';
import { tap } from 'rxjs/operators';

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

  constructor(private store: Store<StoreModel>) {}

  ngAfterViewInit() {}
  ngOnInit() {
    this.store.select('posts').subscribe((posts: Array<PostModel>) => {
      if (this.posts) {
        this.posts = posts;
      
      }
      this.postLikes = posts;
    });
  }

  likePost(postId: string) {
    this.store.dispatch(new AppActions.likePost(postId));
  }
}
*/