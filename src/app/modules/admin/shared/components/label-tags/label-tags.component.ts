import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-label-tags',
  templateUrl: './label-tags.component.html',
  styleUrls: ['./label-tags.component.scss']
})
export class LabelTagsComponent implements OnInit {
  @Input()
  labels : Array<string>;
  @Output()
  emitLabelEE: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
  
  emitLabel(label:string) {
    this.emitLabelEE.emit(label);
  }
}
