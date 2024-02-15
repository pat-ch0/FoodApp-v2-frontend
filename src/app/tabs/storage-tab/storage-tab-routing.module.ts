import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorageTabPage } from './storage-tab.page';

const routes: Routes = [
  {
    path: '',
    component: StorageTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorageTabPageRoutingModule {}
