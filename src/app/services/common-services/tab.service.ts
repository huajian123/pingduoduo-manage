import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SimpleReuseStrategy} from '../../utils/reuse-strategy';

export interface TabModel {
  title: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private tabArray: TabModel[];
  private currSelectedIndexTab = 0;

  constructor(private router: Router) {
    this.tabArray = [];
  }

  addTab(param: TabModel) {
    if (!this.tabArray.find((value) => value.path === param.path)) {
      this.tabArray.push(param);
    }
  }

  getTabArray() {
    return this.tabArray;
  }

  // 右键移除tab
  delRightTab(tabPath, index) {
    this.tabArray.length = index + 1;
    const tempCacheRouters = {};
    this.tabArray.forEach(({path}) => {
      const tempPath = this.formatePath(path);
      for (const i in SimpleReuseStrategy.cacheRouters) {
        if (i === tempPath) {
          tempCacheRouters[i] = SimpleReuseStrategy.cacheRouters[i];
        }
      }
    });
    SimpleReuseStrategy.cacheRouters = {...tempCacheRouters};
    if (this.currSelectedIndexTab > index) {
      this.router.navigateByUrl(tabPath);
      SimpleReuseStrategy.waitDelete = tabPath;
    }
  }

  // 右键移除其他tab
  delOtharTab(path, index) {
    for (let i = 0; i < this.tabArray.length; i++) {
      if (this.tabArray[i].path !== path) {
        this.tabArray.splice(i, 1);
        i--;
      }
    }
    const tempPath = this.formatePath(path);
    for (const i in SimpleReuseStrategy.cacheRouters) {
      if (i !== tempPath) {
        SimpleReuseStrategy.deleteRouteSnapshot(i);
      }
    }
    this.router.navigateByUrl(path);
    SimpleReuseStrategy.waitDelete = path;
  }

  // 点击tab标签上x图标删除tab的动作,右键删除当前tab动作
  delTab(path, index) {
    // 移除当前选中的tab
    if (index === this.currSelectedIndexTab) {
      this.tabArray.splice(index, 1);
      this.currSelectedIndexTab = index - 1 < 0 ? 0 : index - 1;
      this.router.navigateByUrl(this.tabArray[this.currSelectedIndexTab].path);
    } else if (index < this.currSelectedIndexTab) {
      this.tabArray.splice(index, 1);
      this.currSelectedIndexTab = this.currSelectedIndexTab - 1;
    } else if (index > this.currSelectedIndexTab) {
      this.tabArray.splice(index, 1);
    }
    const tempPath = this.formatePath(path);
    SimpleReuseStrategy.deleteRouteSnapshot(tempPath);
  }

  findIndex(path) {
    const current = this.tabArray.findIndex((tabItem) => {
      return tabItem.path === path;
    });
    this.currSelectedIndexTab = current;
    return current;
  }

  getCurrentTabIndex() {
    return this.currSelectedIndexTab;
  }

  formatePath(path: string) {
    return path.substring(path.lastIndexOf('\/') + 1);
  }

}
