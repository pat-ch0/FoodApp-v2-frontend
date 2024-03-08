import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '@Environment/environment';
import { User } from '@Type/user.type';
import { AuthService } from "@Auth/auth.service"

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService, private authService: AuthService) {}

  /**
   * Creates a new user.
   * @param user - The user object.
   * @param password - The password for the user.
   * @returns A Promise that resolves to the response from the API.
   */
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

  /**
   * Logs in a user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A Promise that resolves to the response from the API.
   */
  async login(email: string, password: string) {
    const res = await this.apiService.post(`${environment.config.endpoint.user.login}`, {
      email,
      password,
    });
    const user = res.data;
    ApiService.setToken(user.token);
    return res;
  }

  /**
   * Retrieves the current user.
   * @returns A Promise that resolves to the user object.
   */
  async getUser() {
    const token = await this.authService.getToken();
    const res = await this.apiService.get(`${environment.config.endpoint.user.user}/token/${token}`);
    const user = res.data;
    return user;
  }
}
