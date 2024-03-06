import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './home/signup/signup.component';

@NgModule({
  imports: [RouterModule.forChild(PageRoutingModule.routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      pathMatch: 'full',
    },
    {
      path: 'signup',
      component: SignupComponent,
      pathMatch: 'full',
    },
  ];
}
