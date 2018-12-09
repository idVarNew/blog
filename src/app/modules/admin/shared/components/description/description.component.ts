import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostModel } from '../../../../../shared/models/index';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit, OnChanges {
  @Input()
  post: PostModel;
  @Input()
  NewPostForm: FormGroup;
  formPost = true;
  constructor() {}

  ngOnChanges() {
    if(this.post){
      this.NewPostForm.patchValue({
        description: this.post['description']
      });
    }
  
  }
  ngOnInit() {}

  get desc() {
    return this.NewPostForm.get('description');
  }
}
