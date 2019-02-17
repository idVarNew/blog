import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialComponent } from './social.component';
import { By } from '@angular/platform-browser';

describe('Social Component', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialComponent);
    element = fixture.debugElement.nativeElement;
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit likePostEE on click', () => {
    const button = fixture.debugElement.query(By.css('.like-button')).nativeElement;

    spyOn(component.likePostEE, 'emit');

    button.click();

    fixture.detectChanges();

    expect(component.likePostEE.emit).toHaveBeenCalled();
  });
});
