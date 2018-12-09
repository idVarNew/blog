import { FormGroup } from '@angular/forms';
import { PostModel } from 'src/app/shared/models/index';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input()
  post: PostModel;
  @Input()
  commentsForm: FormGroup;
  @Input()
  postComments: PostModel;
  @Output()
  submitEE = new EventEmitter<{ author: string; comment: string }>();
  comments = false;

  ngOnInit() {}

  get authorControl() {
    return this.commentsForm.get('author');
  }
  get commentControl() {
    return this.commentsForm.get('comment');
  }

  onSubmit() {
    const comment: { author: string; comment: string } = {
      ...this.commentsForm.value
    };
    this.submitEE.emit(comment);
    this.comments = false;
  }
}
