import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '@Environment/environment';
import { ProductDetail } from '@Type/products/product-detail.type';
import { ProductQuantityData } from '@Type/products/quantity.type';

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

  /**
   * Delete a product from a storage
   * @param barcode The product's barcode
   * @returns A promise that resolves with the product details
   */
  async deleteProduct(storageid: string, barcode: string): Promise<any> {
    return this.apiService.delete(
      `${environment.config.endpoint.product}/removeProduct/${storageid}/${barcode}`
    );
  }

  /**
   * Saves the provided product data to the specified community and storage.
   *
   * @param communityId The ID of the community where products will be saved.
   * @param storageId The ID of the storage where products will be saved.
   * @param data The products List data to be saved.
   * @returns A Promise that resolves to the response from the API after saving the products.
   */
  async saveProductsInStorage(communityId: String, storageId: String, data: ProductQuantityData[]): Promise<any> {
    console.log(communityId, storageId);
    
    return this.apiService.post(
      `${environment.config.endpoint.product}/saveProducts/${communityId}/${storageId}`,
      data
    );
  }

  async getProductsInStorage(storageId: String): Promise<any> {
    return this.apiService.get(
      `${environment.config.endpoint.product}/getProducts/${storageId}`
    );
  }
  
  /**
   * Retrieve the number of products for a storage
   * @param storageId The ID of the storage
   * @returns A promise that resolves with the number of products
   */
  async getProductCount(storageId: string): Promise<any> {
    return this.apiService.get(
      `${environment.config.endpoint.product}/countProductsInStock/${storageId}`
    );
  }
}
