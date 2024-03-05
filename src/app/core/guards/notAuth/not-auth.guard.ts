import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { AuthService } from '@Auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin();
  }

  private async checkLogin(): Promise<boolean | UrlTree> {
    const isLoggedIn = await this.authService.isUserLoggedIn();

    if (isLoggedIn) {
      // User is not logged logged in
      return this.router.createUrlTree(['/tabs/search']);
    } else {
      // User is logged in, redirect to home
      return true;
    }
  }
}
