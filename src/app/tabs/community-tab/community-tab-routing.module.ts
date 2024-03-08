import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityTabPage } from './community-tab.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityTabPageRoutingModule {}
