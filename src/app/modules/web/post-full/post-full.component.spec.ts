/*
import { async, ComponentFixture, TestBed, fakeAsync, tick, flush, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostFullComponent } from './post-full.component';
import {  FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { TestStore } from 'src/testing/utils';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { PostFullService } from './post-full.services';


describe('Post Full Component', () => {
  let component: PostFullComponent;
  let fixture: ComponentFixture<PostFullComponent>;
  let store;
  let element;
  let posts = [
    {
      id: '_5my2l15b9',
      title: 'title',
      description: 'string',
      publishDate: '2018-12-09T22:37:11.137Z',
      labels: [],
      comments: [],
      likes: 0,
      img: {
        small: [
          {
            name: 'size-800-63jo8i2vyanita-austvika-1096223-unsplash.jpg',
            url:
              'https://firebasestorage.googleapis.com/v0/b/photos-93ec1.appspot.com/o/uploads%2Fsize-800-63jo8i2vyanita-austvika-1096223-unsplash.jpg?alt=media&token=c0e26745-19c7-4c3b-a204-dbc9ef27748c'
          }
        ],
        large: [
          {
            name: 'size-800-63jo8i2vyanita-austvika-1096223-unsplash.jpg',
            url:
              'https://firebasestorage.googleapis.com/v0/b/photos-93ec1.appspot.com/o/uploads%2Fsize-800-63jo8i2vyanita-austvika-1096223-unsplash.jpg?alt=media&token=c0e26745-19c7-4c3b-a204-dbc9ef27748c'
          }
        ]
      }
    }
  ];

  let angularFireDatabaseStub = { list: () => {} };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostFullComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        FormBuilder,
        PostFullService,
        { provide: ActivatedRoute, useValue: { paramMap: Observable.of({ id: '_5my2l15b9' }) } },
        { provide: Store, useClass: TestStore },
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFullComponent);
    element = fixture.debugElement.nativeElement;
    component = fixture.debugElement.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should full post create', () => {
    expect(component).toBeTruthy();
  });
});


*/