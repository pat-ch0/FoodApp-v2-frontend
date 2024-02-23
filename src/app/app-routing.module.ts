import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { SharedModule } from './shared/shared.module';
import { ProductStockComponent } from './pages/product/product-stock/product-stock.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'product-detail/:barcode',
    component: ProductDetailComponent,
  },
  {
    path: 'product-stock',
    component: ProductStockComponent,
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
