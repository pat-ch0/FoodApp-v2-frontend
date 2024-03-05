import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'search',
        loadChildren: () =>
          import('./search-tab/search-tab.module').then( (m) => m.SearchTabPageModule),
      },
      {
        path: 'community',
        loadChildren: () =>
          import('./community-tab/community-tab.module').then( (m) => m.CommunityTabPageModule),
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu-tab/menu-tab.module').then((m) => m.MenuTabPageModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/tabs/search',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
