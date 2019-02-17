/*
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchResultsComponent } from './search-results.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostCardModule } from '../post-card/post-card.module';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { TestStore } from 'src/testing/utils';
import { initialSettings } from '../../../store/app.state';
import { PostsModule } from '../posts/posts.module';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import 'rxjs/add/observable/of';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { posts } from 'src/testing/posts';

describe('Search component', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let store;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [
        ReactiveFormsModule,
        NgxMasonryModule,
        StoreModule.forRoot({}),
        NgxPaginationModule,
        PostCardModule,
        PostsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: Observable.of({ label: 'all' }) } },
        { provide: Store, useClass: TestStore }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    element = fixture.debugElement.nativeElement;
    component = fixture.debugElement.componentInstance;
    component.posts = posts;

    fixture.detectChanges();
  });

 
  beforeEach(inject([Store], testStore => {
    store = testStore;
    store.setState({ posts: posts, settings: initialSettings }); 
  }));

  it('should search create', () => {
    expect(component).toBeTruthy();
  });

  it('should get search posts', fakeAsync(() => {
    let response;
    component.posts.length =1
    
    tick()
   
    store.setState({
      posts: posts,
      settings: initialSettings
    });
tick()
  //  fixture.detectChanges();
    store.select('posts').subscribe(posts => {
      response = posts;
    });

   expect(response.posts[0].title).toEqual('title');
  }));


  it('Should return label', inject([ActivatedRoute], service => {
    service.queryParams.subscribe(value => {
      expect(value.label).toEqual('all');
    });
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
*/