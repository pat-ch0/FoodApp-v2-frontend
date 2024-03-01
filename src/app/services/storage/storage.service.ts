import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '@environment/environment';

// Service to handle storage data operations.
@Injectable({
  providedIn: 'root',
})

export class StorageService {
  constructor(private apiService: ApiService) {}

  /**
   * Retrieves storage details from the backend service
   * @param id The storage's id
   * @returns A promise that resolves with the storage details
   */
  async addStorage(id: string): Promise<any> {
    return this.apiService.get(`${environment.config.endpoint.storage}${id}`);
  }

  /**
   * Delete a storage
   * @param id The storage's id
   * @returns A promise that resolves with the storage details
   */
  async deleteStorage(id: string): Promise<any> {
    return this.apiService.delete(`${environment.config.endpoint.stock}${id}`)
  }

  async editStorage(id: string, newName: string): Promise<any> {
    return this.apiService.patch(`${environment.config.endpoint.stock}${id}`, newName)
  }
}