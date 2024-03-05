import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '@Environment/environment';
import { Community } from '@Type/community/community.type';
import { City } from '@Type/community/city.type';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private apiService: ApiService) {}

  async addUserToCommunity(email: string, communityId: string) {
    const response = await this.apiService.post(
      `${environment.config.endpoint.community.community}/addUser`,
      { email, communityId }
    );
    console.log(response);
    if (response.status !== 200) {
      throw new Error('Error fetching cities');
    }
    return response.data;
  }

  async getCities(): Promise<City[]> {  
    const response = await this.apiService.get(
      `${environment.config.endpoint.community.city}`
    );
    if (response.status !== 200) {
      throw new Error('Error fetching cities');
    }
    return response.data;
  }

  async createCommunity(
    community: Community
  ): Promise<{ community: Community; userRoleLabel: string }> {
    const response = await this.apiService.post(
      `${environment.config.endpoint.community.community}`,
      community
    );
    if (response.status !== 200) {
      throw new Error('Error creating community');
    }
    return response.data;
  }

  async deleteCommunity(id: string): Promise<boolean> {
    const response = await this.apiService.delete(
      `${environment.config.endpoint.community.community}/${id}`
    );
    console.log(response);
    if (response.status !== 200) {
      throw new Error('Error deleting community');
    }
    return true;
  }

  async editCommunity(id: string, newName: string): Promise<any> {
    return await this.apiService.patch(
      `${environment.config.endpoint.community.community}${id}`,
      newName
    );
  }

  async getCommunities(): Promise<
    { community: Community; userRoleLabel: string }[]
  > {
    const response = await this.apiService.get(
      `${environment.config.endpoint.community.community}`
    );
    if (response.status !== 200) {
      throw new Error('Error fetching communities');
    }
    return response.data;
  }
}