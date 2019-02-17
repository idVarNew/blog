
import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImagesComponent } from './images.component';
import { By } from '@angular/platform-browser';
import { posts } from 'src/testing/posts';

describe('Images component', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.debugElement.componentInstance;
    component.post = posts[0];

    fixture.detectChanges(); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Button .post-image-prev', () => {
    let button;

    beforeEach(async(() => {
      button = fixture.debugElement.query(By.css('.post-image-prev')).nativeElement;
    }));

    it('should emit prevImageEE on click', () => {
      component.imgIndex = 1;
      fixture.detectChanges();

      spyOn(component.prevImageEE, 'emit');

      button.click();

      fixture.detectChanges();

      expect(component.prevImageEE.emit).toHaveBeenCalled();
    });

    it('should button .post-image-prev be disabled when no more previous images to show', () => {
      component.imgIndex = 0;
      fixture.detectChanges();

      expect(button.disabled).toBeTruthy();
    });
  });

  describe('Button .post-image-next', () => {
    let button;

    beforeEach(async(() => {
      button = fixture.debugElement.query(By.css('.post-image-next')).nativeElement;
    }));

    it('should emit nextImageEE on click', () => {
      component.imgIndex = 0;

      fixture.detectChanges();

      spyOn(component.nextImageEE, 'emit');

      button.click();

      fixture.detectChanges();

      expect(component.nextImageEE.emit).toHaveBeenCalled();
    });


    it('should button .post-image-next be disabled when there is no next photos to show', () => {
      component.imgIndex = 1;
      fixture.detectChanges();

      expect(button.disabled).toBeTruthy();
    });
    
  });
});

