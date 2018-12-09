import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/shared/models';

@Component({
  selector: 'app-random-posts',
  templateUrl: './random-posts.component.html',
  styleUrls: ['./random-posts.component.scss']
})
export class RandomPostsComponent implements OnInit {
  @Input()
  randomPostsList: Array<PostModel>;
  constructor() {}

  ngOnInit() {}
}
