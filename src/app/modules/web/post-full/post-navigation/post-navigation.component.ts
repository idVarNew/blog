import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-post-navigation',
  templateUrl: './post-navigation.component.html',
  styleUrls: ['./post-navigation.component.scss']
})
export class PostNavigationComponent implements OnInit {
  @Input()
  postsStarts: boolean;
  @Input()
  postsEnds: boolean;
  @Output()
  prevPostEE: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  nextPostEE: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  prevPost() {
    this.prevPostEE.emit();
  }
  nextPost() {
    this.nextPostEE.emit();
  }
}
