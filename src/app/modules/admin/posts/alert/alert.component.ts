import { PostModel } from './../../../../shared/models/post.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss', '../posts.component.scss']
})
export class AlertComponent implements OnInit {
  @Input()
  post: PostModel;
  @Input()
  togglePanel: {};
  @Output()
  deletePostEE: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}
  deletePost(postId) {
    this.deletePostEE.emit(postId);
  }
}
