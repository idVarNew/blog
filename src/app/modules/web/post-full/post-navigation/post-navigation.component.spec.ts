
import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { PostNavigationComponent } from './post-navigation.component';
import { By } from '@angular/platform-browser';

describe('Post Navigation Component', () => {
  let component: PostNavigationComponent;
  let fixture: ComponentFixture<PostNavigationComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostNavigationComponent);
    element = fixture.debugElement.nativeElement;
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges(); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('button .post-next ', () => {
    let button;

    beforeEach(async(() => {
      button = fixture.debugElement.query(By.css('.post-next')).nativeElement;
    }));

    it('should emit nextPostEE on click', () => {
      component.postsEnds = false;

      spyOn(component.nextPostEE, 'emit');

      button.click();

      fixture.detectChanges();

      expect(component.nextPostEE.emit).toHaveBeenCalled();
    });

    it('should button .post-prev be disabled on postsEnds= true', () => {
      component.postsEnds = false;
      fixture.detectChanges();

      expect(button.disabled).toBeFalsy();

      component.postsEnds = true;
      fixture.detectChanges();

      expect(button.disabled).toBeTruthy();
    });
  });

  describe('button .post-prev ', () => {
    let button;

    beforeEach(async(() => {
      button = fixture.debugElement.query(By.css('.post-prev')).nativeElement;
    }));

    it('should emit prevPostEE on click', () => {
      component.postsStarts = false;
      spyOn(component.prevPostEE, 'emit');

      button.click();

      fixture.detectChanges();

      expect(component.prevPostEE.emit).toHaveBeenCalled();
    });

    it('should button .post-next be disabled on postsEnds= true', () => {
      component.postsStarts = true;
      fixture.detectChanges();

      expect(button.disabled).toBeTruthy();

      component.postsStarts = false;
      fixture.detectChanges();

      expect(button.disabled).toBeFalsy();
    });
  });
});

