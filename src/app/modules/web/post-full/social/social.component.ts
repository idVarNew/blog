import { PostModel } from 'src/app/shared/models/index';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  @Input()
  post: PostModel;
  @Output()
  likePostEE: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  likePost(postId: string) {
    this.likePostEE.emit(postId);
  }
}
