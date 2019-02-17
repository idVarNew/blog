import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { PostsRoutingModule } from './posts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostCardModule } from '../post-card/post-card.module';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { TestStore } from 'src/testing/utils';
import { initialSettings } from '../../../store/app.state';
import * as AppActions from '../../../store/actions';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { posts } from 'src/testing/posts';
import { RouterTestingModule } from '@angular/router/testing';


describe('Posts Component', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let store;
  let element;
  let dispatchSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [RouterTestingModule,
        PostsRoutingModule,
        ReactiveFormsModule,
        NgxMasonryModule,
        StoreModule.forRoot({}),
        NgxPaginationModule,
        PostCardModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Store, useClass: TestStore }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    element = fixture.debugElement.nativeElement;
    component = fixture.debugElement.componentInstance;
    component.posts = posts
    fixture.detectChanges();
  });

  beforeEach(inject([Store], testStore => {
    store = testStore; 
    store.setState({ posts: [], settings: initialSettings }); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch likePost action', () => {
    dispatchSpy = spyOn(store, 'dispatch');
 
    component.likePost('_5my2l15b9');

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new AppActions.likePost('_5my2l15b9')     
    );
  });

  it('should get posts', async(() => {
    let response;

    store.setState({
      posts: posts,
      settings: initialSettings
    });
  
    component.posts =posts
  fixture.detectChanges();

  
    store.select('posts').subscribe(posts => {
      response = posts;
    });

    expect(response.posts.length).toBe(posts.length);
    expect(response.posts[0]).toEqual(posts[0]);
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
});


/*
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { PostsRoutingModule } from './posts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostCardModule } from '../post-card/post-card.module';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { TestStore } from 'src/testing/utils';
import { initialSettings } from '../../../store/app.state';
import * as AppActions from '../../../store/actions';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { posts } from 'src/testing/posts';


describe('Posts Component', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let store;
  let element;
  let dispatchSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [
        PostsRoutingModule,
        ReactiveFormsModule,
        NgxMasonryModule,
        StoreModule.forRoot({}),
        NgxPaginationModule,
        PostCardModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Store, useClass: TestStore }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    element = fixture.debugElement.nativeElement;
    component = fixture.debugElement.componentInstance;
    component.posts = posts
    fixture.detectChanges();
  });

  beforeEach(inject([Store], testStore => {
    store = testStore; 
    store.setState({ posts: [], settings: initialSettings }); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch likePost action', () => {
    dispatchSpy = spyOn(store, 'dispatch');
 
    component.likePost('_5my2l15b9');

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new AppActions.likePost('_5my2l15b9')     
    );
  });

  it('should get posts', () => {
    let response;

    store.setState({
      posts: posts,
      settings: initialSettings
    });

    fixture.detectChanges();

    store.select('posts').subscribe(posts => {
      response = posts;
    });

    expect(response.posts.length).toBe(posts.length);
    expect(response.posts[0]).toEqual(posts[0]);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
});


*/