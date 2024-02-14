import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

/**
 * Service for sending notification tokens.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ApiService {

  /**
   * Sends the provided token to the server for phone notifications.
   * @param token - The notification token.
   */
  async sendMyTokenPhone(token: string): Promise<void> {
    await this.get('api/v1/notification/token/'+ token)
  }
}