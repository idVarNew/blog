import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss',  '../posts.component.scss']
})
export class OptionsComponent implements OnInit {
  @Input()
  post;
  @Input()
  togglePanel;

  constructor() {}

  ngOnInit() {}
}
