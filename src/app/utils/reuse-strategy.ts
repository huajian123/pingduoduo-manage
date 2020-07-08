import {RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

/*
// 各个方法调用顺序
1shouldReuseRoute(future, curr)
2retrieve(route)
3shouldDetach(route)RouteReuseStrategyRouteReuseStrategy
4store(route, detachedTree)
5shouldAttach(route)
6retrieve,取决一上一步的返回值
7store(route, detachedTree),取决第五步*/

export class SimpleReuseStrategy implements RouteReuseStrategy {

  static cacheRouters: { [key: string]: any } = {};
  public static waitDelete: string;

  public static deleteRouteSnapshot(path: string): void {
    if (SimpleReuseStrategy.cacheRouters[path]) {
      SimpleReuseStrategy.cacheRouters[path]?.handle?.componentRef.destroy();
      delete SimpleReuseStrategy.cacheRouters[path];
    }
    SimpleReuseStrategy.waitDelete = path;
  }


  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // 同一路由时复用路由
    return future.routeConfig === curr.routeConfig;
  }

  // 获取存储路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // 从缓存中获取快照，若无则返回null
    if (!route.routeConfig || route.routeConfig.loadChildren || !SimpleReuseStrategy.cacheRouters[route.routeConfig.path]) {
      return null;
    }
    return SimpleReuseStrategy.cacheRouters[route.routeConfig.path].handle;

  }


  // 路由离开时才会触发
  // 路由离开时是否需要保存页面，这是实现自定义路由复用策略最重要的一个方法
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // 默认对所有路由复用 可通过给路由配置项增加data: { keep: true }来进行选择性使用
    // {path: 'search', component: SearchComponent, data: {keep: true}},
    return route.data.keep;
  }


  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (SimpleReuseStrategy.waitDelete && SimpleReuseStrategy.waitDelete === route.routeConfig.path) {
      // 如果待删除是当前路由则不存储快照
      SimpleReuseStrategy.waitDelete = null;
      return;
    }
    // 只要有waitDelete就不存储，因为右键删除时点击非当前tab，同样会存储快照
    /*  if (SimpleReuseStrategy.waitDelete&& SimpleReuseStrategy.waitDelete==route.routeConfig.path) {
        SimpleReuseStrategy.waitDelete = null;
        return;
      }*/

    // 按path作为key存储路由快照&组件当前实例对象
    // path等同RouterModule.forRoot中的配置
    SimpleReuseStrategy.cacheRouters[route.routeConfig.path] = {
      snapshot: route,
      handle
    };
  }

  // 如果shouldDetach方法返回true，会调用这个方法来保存页面
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // 在缓存中有的都认为允许还原路由
    return !!route.routeConfig && !!SimpleReuseStrategy.cacheRouters[route.routeConfig.path];
  }

}
