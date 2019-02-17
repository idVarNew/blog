import { Effects } from './app.effects';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, throwError } from 'rxjs';
import { PostsService } from '../core/services/posts.service';
import * as AppActions from './actions/index';
import * as PostsActions from './actions/posts.actions';
import { StoreModule } from '@ngrx/store';
import { FakeState } from 'src/testing/state';


describe('Store Effects', () => {
  let postsEffects: Effects;
  let postsService: PostsService;
  let actions$: ReplaySubject<any>;

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        Effects,
        provideMockActions(() => actions$),  {
          provide: PostsService,
          useValue: jasmine.createSpyObj('postsService', ['getAllPosts', 'getUpdate'])
        }
      ]
    })
  ));

  describe('getPosts$ effect', () => {
    beforeEach(() => {
      postsEffects = TestBed.get(Effects);
      postsService = TestBed.get(PostsService);
      (postsService.getAllPosts as jasmine.Spy).and.returnValue(of(FakeState));
    });

    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(new PostsActions.loadPosts()); 
    });

    it('should load initial posts', () => {
      postsEffects.getPosts$.subscribe(resultAction => {
        const posts = new AppActions.loadInitialPosts(FakeState.posts);

        expect(resultAction['payload'].posts).toEqual(posts.payload);
      });
    });

    it('should load initial settings', () => {
      postsEffects.getPosts$.subscribe(resultAction => {
        const settings = new AppActions.loadSettings(FakeState.settings);

        expect(resultAction['payload'].settings).toEqual(settings.payload);
      });
    });
  });

  describe('updatePosts$ effect', () => {
    beforeEach(() => {
      postsEffects = TestBed.get(Effects);
      postsService = TestBed.get(PostsService);
      (postsService.getUpdate as jasmine.Spy).and.returnValue(of(FakeState));
    });

    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(new PostsActions.likePost('_5my2l15b9')); 
    });

    it('should updatePosts$ be called on success', () => {
      postsEffects.updatePosts$.subscribe(resultAction => {
     
        expect(postsService.getUpdate).toHaveBeenCalled();
      });
    });
  });
});
