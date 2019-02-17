import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RandomPostsComponent } from './random-posts.component';
import { By } from '@angular/platform-browser';
import { PostFullModule } from '../post-full.module';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DebugElement, NgModuleFactoryLoader } from '@angular/core';
import { posts } from 'src/testing/posts';

describe('Random posts component', () => {
  let component: RandomPostsComponent;
  let fixture: ComponentFixture<RandomPostsComponent>;
  let location: Location;
  let router: Router;
  let debugElement: DebugElement;
  let loader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, PostFullModule]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(RandomPostsComponent);
    component = fixture.debugElement.componentInstance;
    debugElement = fixture.debugElement;

    component.randomPostsList = posts;
    fixture.detectChanges();

    loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = {
      fullPost: PostFullModule
    };

    router.resetConfig([{ path: 'posts/:id', loadChildren: 'fullPost' }]);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigates to post on click', fakeAsync(() => {
    debugElement.query(By.css('.random-link')).nativeElement.click();

    tick();

    expect(location.path()).toBe('/posts/_5my2l15b9');
  }));
});
