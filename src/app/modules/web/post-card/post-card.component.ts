import { PostModel } from './../../../shared/models/post.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input()
  post: PostModel;
  @Input()
  i: number;
  @Input()
  postLikes: Array<PostModel>;
  @Output()
  likePostEE:  EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  likePost(postId: string) {
    this.likePostEE.emit(postId);
  }
}
