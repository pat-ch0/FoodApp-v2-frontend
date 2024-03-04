import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { AuthService } from '@Auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  private async checkLogin(): Promise<boolean | UrlTree> {
    const isLoggedIn = await this.authService.isUserLoggedIn();

    if (isLoggedIn) {
      // User is logged in
      return true;
    } else {
      // User is not logged in, redirect to home
      return this.router.createUrlTree(['/home']);
    }
  }
}