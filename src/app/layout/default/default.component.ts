import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-defalut',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class LayoutDefalutComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

}
