import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '@environment/environment';
import { Message } from '@type/message.type';

/**
 * Service to handle product data operations.
 */
@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private apiService: ApiService) {}

  /**
   * Retrieves product details by barcode from the backend service.
   * @param barcode The barcode to query for product details.
   * @returns A promise that resolves with the product details.
   */
  async postAiMessage(messages: Message[]): Promise<any> {
    // Constructs the URL with the endpoint from environment variables and the passed barcode
    const test = { 
        messages: messages
    }
    return this.apiService.post(`${environment.config.ai.endpoint}`, messages);
  } 
}