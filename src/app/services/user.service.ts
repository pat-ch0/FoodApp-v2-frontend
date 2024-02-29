import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '@environment/environment';
import { User } from '@type/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}


  async createUser(user: User, password: string) {
    const res = await this.apiService.post(`${environment.config.user.createUser}`, {
        ...user,
        password,
    });
    console.log(res);
    const newUser = res.data;
    ApiService.setToken(newUser.token);
    return res;
  }

  async login(email: string, password: string) {
    const res = await this.apiService.post(`${environment.config.user.login}`, {
      email,
      password,
    });
    const user = res.data;
    ApiService.setToken(user.token);
    return res;
  }

}
