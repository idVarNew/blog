import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  @Input()
  navVisible;
  @Input()
  userEmail;
  @Output()
  logoutEE: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  changeNavVisibleEE: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  logout() {
    this.logoutEE.emit();
  }
  changeNavVisible() {
    this.navVisible = !this.navVisible;
    this.changeNavVisibleEE.emit(this.navVisible);
  }
}
