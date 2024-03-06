import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '@Environment/environment';
import { User } from '@Type/user.type';
import { AuthService } from "@Auth/auth.service"
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService, private authService: AuthService) {}

  async createUser(user: User, password: string) {
    const res = await this.apiService.post(
      `${environment.config.endpoint.user.user}`,
      {
        ...user,
        password,
      }
    );
    console.log(res);
    const newUser = res.data;
    ApiService.setToken(newUser.token);
    return res;
  }

  async login(email: string, password: string) {
    const res = await this.apiService.post(`${environment.config.endpoint.user.login}`, {
      email,
      password,
    });
    const user = res.data;
    ApiService.setToken(user.token);
    return res;
  }

  async getUser() {
    const token = await this.authService.getToken();
    const res = await this.apiService.get(`${environment.config.endpoint.user.user}/token/${token}`);
    const user = res.data;
    return user
    // return res;
  }

}
