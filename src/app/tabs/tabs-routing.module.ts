import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'storage',
        loadChildren: () => import('./storage-tab/storage-tab.module').then( m => m.StorageTabPageModule)
      }, 
      {
        path: 'menu',
        loadChildren: () => import('./search-tab/search-tab.module').then(m => m.SearchTabPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./menu-tab/menu-tab.module').then(m => m.MenuTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/search',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/search',
    pathMatch: 'full'
  },
  {
    path: 'storage-tab',
    loadChildren: () => import('./storage-tab/storage-tab.module').then( m => m.StorageTabPageModule)
  },
  {
    path: 'search-tab',
    loadChildren: () => import('./search-tab/search-tab.module').then( m => m.SearchTabPageModule)
  },
  {
    path: 'menu-tab',
    loadChildren: () => import('./menu-tab/menu-tab.module').then( m => m.MenuTabPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
