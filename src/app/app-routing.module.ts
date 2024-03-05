import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductStockComponent } from './pages/product/product-stock/product-stock.component';
import { StorageComponent } from './pages/storage/storage.component';
import { AuthGuard } from '@Guard/auth/auth.guard';
import { NotAuthGuard } from '@Guard/notAuth/not-auth.guard';
import { ProfilComponent } from './pages/profil/profil.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/page.module').then((m) => m.PageModule),
    canActivate: [NotAuthGuard],
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'product-detail/:barcode',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product-stock',
    component: ProductStockComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'storage/:communityid',
    component: StorageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
  {
    path: 'tabs/profil',
    component: ProfilComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
