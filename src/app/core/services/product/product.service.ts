import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '@Environment/environment';

/**
 * Service to handle product data operations.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  /**
   * Retrieves product details by barcode from the backend service.
   * @param barcode The barcode to query for product details.
   * @returns A promise that resolves with the product details.
   */
  async getProductByBarcode(barcode: string): Promise<any> {
    // Constructs the URL with the endpoint from environment variables and the passed barcode
    return this.apiService.get(
      `${environment.config.endpoint.product}/${barcode}`
    );
  }

  // TODO: Move this to storage service and Fix the method to send the id of storage + barcode id | ex endpoint : storageId/barcode
  /**
   * Delete a product from a storage
   * @param barcode The product's barcode
   * @returns A promise that resolves with the product details
   */
  async deleteProduct(barcode: string): Promise<any> {
    return this.apiService.delete(
      `${environment.config.endpoint.stock.productStock}/${barcode}`
    );
  }
}
