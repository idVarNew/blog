import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { PostModel } from '../../../../../shared/models/index';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit, OnChanges {
  @Input()
  post: PostModel;
  @Input()
  NewPostForm: FormGroup;
  formPostTitle = true;
  constructor() {}

  ngOnChanges() {
    if (this.post) {
      this.NewPostForm.patchValue({
        title: this.post['title']
      });
    }
  }
  ngOnInit() {}

  get titl() {
    return this.NewPostForm.get('title');
  }
}
