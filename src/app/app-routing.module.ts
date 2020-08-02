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
        path: '', redirectTo: 'home-page', pathMatch: 'full'
      },
      {path: 'home-page', loadChildren: () => import('./pages/workboard/workboard.module').then(m => m.WorkboardModule)},
      {path: 'commodity-manage', loadChildren: () => import('./pages/commodity/commodity.module').then(m => m.CommodityModule)},
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
