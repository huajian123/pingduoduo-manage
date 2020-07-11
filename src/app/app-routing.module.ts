import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutDefalutComponent} from './layout/default/default.component';
import {LoginLayoutComponent} from './pages/login/login-layout/login-layout.component';
import {QuicklinkStrategy} from 'ngx-quicklink';


const routes: Routes = [
  {path: 'login', component: LoginLayoutComponent},
  {
    path: 'hazard',
    component: LayoutDefalutComponent,
    // canActivate: [SimpleGuard],
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
      {path: 'forms', loadChildren: () => import('./pages/forms/forms.module').then(m => m.FormsModule)},
      // { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘', titleI18n: 'dashboard' } },
      {path: 'list', loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule)},
      {path: 'commodity', loadChildren: () => import('./pages/commodity/commodity.module').then(m => m.CommodityModule)},
    ],
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: QuicklinkStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
