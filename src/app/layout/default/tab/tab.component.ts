import {Component, OnInit} from '@angular/core';
import {TabModel, TabService} from '../../../services/common-services/tab.service';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less']
})
export class TabComponent implements OnInit {
  tabs: TabModel[];

  constructor(public tabService: TabService, private nzContextMenuService: NzContextMenuService) {
    this.tabs = tabService.getTabArray();
  }

  stopMounseEvent(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  // 右键点击关闭右侧tab
  closeRithTab(tab, e, index) {
    this.stopMounseEvent(e);
    this.tabService.delRightTab(tab.path, index);
  }

  // 关闭其他tab
  closeOtherTab(tab, e, index) {
    this.stopMounseEvent(e);
    this.tabService.delOtharTab(tab.path, index);
  }

  // 关闭当前Tab
  closeTab(tab, e, index) {
    this.stopMounseEvent(e);
    if (1 === this.tabs.length) {
      return;
    }
    this.tabService.delTab(tab.path, index);
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  ngOnInit(): void {
  }

}
