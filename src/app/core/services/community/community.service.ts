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

  /**
   * Adds a user to a community.
   * @param email - The email of the user.
   * @param communityId - The ID of the community.
   * @returns The response data.
   * @throws Error if there is an error fetching cities.
   */
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

  /**
   * Retrieves a list of cities.
   * @returns A promise that resolves to an array of City objects.
   * @throws Error if there is an error fetching cities.
   */
  async getCities(): Promise<City[]> {  
    const response = await this.apiService.get(
      `${environment.config.endpoint.community.city}`
    );
    if (response.status !== 200) {
      throw new Error('Error fetching cities');
    }
    return response.data;
  }

  /**
   * Creates a new community.
   * @param community - The community object to create.
   * @returns A promise that resolves to an object containing the created community and the user role label.
   * @throws Error if there is an error creating the community.
   */
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

  /**
   * Deletes a community.
   * @param id - The ID of the community to delete.
   * @returns A promise that resolves to a boolean indicating whether the community was successfully deleted.
   * @throws Error if there is an error deleting the community.
   */
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

  /**
   * Edits a community.
   * @param id - The ID of the community to edit.
   * @param newName - The new name for the community.
   * @returns A promise that resolves to the response data.
   */
  async editCommunity(id: string, newName: string): Promise<any> {
    return await this.apiService.patch(
      `${environment.config.endpoint.community.community}${id}`,
      newName
    );
  }

  /**
   * Retrieves a list of communities.
   * @returns A promise that resolves to an array of objects containing the community and the user role label.
   * @throws Error if there is an error fetching the communities.
   */
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
