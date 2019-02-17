
import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { LabelsComponent } from './labels.component';
import { By } from '@angular/platform-browser';
import { posts } from 'src/testing/posts';

describe('LabelsComponent', () => {
  let component: LabelsComponent;
  let fixture: ComponentFixture<LabelsComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelsComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LabelsComponent);
    element = fixture.debugElement.nativeElement;
    component = fixture.debugElement.componentInstance;
    component.post = posts[0];

    fixture.detectChanges(); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filterByLabelEE on click', () => {
    spyOn(component.filterByLabelEE, 'emit');

    let button = fixture.debugElement.query(By.css('.post-label')).nativeElement;

    button.click();

    fixture.detectChanges();

    expect(component.filterByLabelEE.emit).toHaveBeenCalled();
    expect(component.filterByLabelEE.emit).toHaveBeenCalledWith('garden');
  });
});


