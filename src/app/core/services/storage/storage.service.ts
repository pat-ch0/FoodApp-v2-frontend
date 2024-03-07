import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '@Environment/environment';
import { StorageType } from '@Type/storage.type';

// Service to handle storage data operations.
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private apiService: ApiService) {}

  /**
   * Retrieve all storage zones
   * @returns A promise that resolves with the list of storage zones
   */
  async getAllStorages(communityId: string): Promise<any> {
    return this.apiService.get(
      `${environment.config.endpoint.stock.storageZone}/${communityId}`
    );
  }

  /**
   * Create a new storage
   * @param storage The new storage detail
   * @returns A promise that resolves with ...
   */
  async addStorage(storage: StorageType): Promise<any> {
    return this.apiService.post(
      `${environment.config.endpoint.stock.storageZone}`,
      storage
    );
  }

  /**
   * Retrieves storage details from the backend service
   * @param id The storage's id
   * @returns A promise that resolves with the storage details
   */
  async getStorage(id: string): Promise<any> {
    return this.apiService.get(
      `${environment.config.endpoint.stock.storageZone}/${id}`
    );
  }

  /**
   * Delete a storage
   * @param id The storage's id
   * @returns A promise that resolves with the storage details
   */
  async deleteStorage(id: string): Promise<any> {
    return this.apiService.delete(
      `${environment.config.endpoint.stock.storageZone}/${id}`
    );
  }

  /**
   * Update storage details in the backend service.
   * @param storage The updated storage details, including the storage's id.
   * @returns A promise that resolves with the updated storage details.
   */
  async updateStorage(storage: StorageType): Promise<any> {
    return this.apiService.put(
      `${environment.config.endpoint.stock.storageZone}/${storage.id}`,
      storage
    );
  }
}
