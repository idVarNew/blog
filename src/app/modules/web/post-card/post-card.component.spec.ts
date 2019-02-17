import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostCardComponent } from './post-card.component';
import { By } from '@angular/platform-browser';
import { posts } from 'src/testing/posts';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;
  let element;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostCardComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostCardComponent);
    element = fixture.debugElement.nativeElement;
    component = fixture.debugElement.componentInstance;
    component.postLikes = posts; 
    component.i = 0; 
    component.post = posts[0];
    fixture.detectChanges(); 

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit like on click', () => {
    spyOn(component.likePostEE, 'emit');

    let closeBtn = fixture.nativeElement.querySelector('button');
    closeBtn.click();

    fixture.detectChanges();

    expect(component.likePostEE.emit).toHaveBeenCalled();
    expect(component.likePostEE.emit).toHaveBeenCalledWith('_5my2l15b9');
  });


  it('should change the number of likes', () => {
    expect(element.querySelector('span').textContent).toContain('0');

    posts[0].likes = posts[0].likes + 1;

   fixture.detectChanges();
    expect(element.querySelector('span').textContent).toContain('1');
  });

});
