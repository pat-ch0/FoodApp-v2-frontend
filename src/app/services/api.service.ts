import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from '@environment/environment';
import { AuthService } from './auth.service'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private static baseUrl = environment.config.API_GATEWAY;
  private static staticAuthService: AuthService;
  constructor(private authService: AuthService) {
    ApiService.staticAuthService = authService;
  }

  // Cette méthode n'est plus statique pour pouvoir utiliser authService
  static async setToken(token: string) {
    await this.staticAuthService.setToken(token);
  }

  /**
   * Récupère les headers pour la requête HTTP, incluant le JWT si présent.
   */
  private static async getHeaders() {
    const token = await this.staticAuthService.getToken();
    return {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(token ? { Authorization: `${token}` } : {}),
    };
  }

  /**
   * Perform a GET request to the API.
   * @param url - The URL for the request.
   * @param params - The query parameters for the request.
   * @returns A promise that resolves to the response data.
   * @throws An error if the request fails.
   */
  async get(url: string, params: any = {}): Promise<any> {
    try {
      const response = await CapacitorHttp.get({
        url: ApiService.baseUrl + url,
        headers: await ApiService.getHeaders(),
        params,
      });
      return response;
    } catch (error) {
      console.error('Error performing GET request:', error);
      throw error;
    }
  }

  /**
   * Perform a POST request to the API.
   * @param url - The URL for the request.
   * @param data - The data to send in the request body.
   * @returns A promise that resolves to the response data.
   * @throws An error if the request fails.
   */
  async post(url: string, data: any): Promise<any> {
    try {
      const response = await CapacitorHttp.post({
        url: ApiService.baseUrl + url,
        headers: await ApiService.getHeaders(),
        data,
      });
      return response;
    } catch (error) {
      console.error('Error performing POST request:', error);
      throw error;
    }
  }

  /**
   * Perform a DELETE request to the API.
   * @param url - The URL for the request.
   * @param params - The query parameters for the request.
   * @returns A promise that resolves to the response data.
   * @throws An error if the request fails.
   */
  async delete(url: string, params: any = {}): Promise<any> {
    try {
      const response = await CapacitorHttp.delete({
        url: ApiService.baseUrl + url,
        headers: await ApiService.getHeaders(),
        params,
      });
      return response;
    } catch (error) {
      console.error('Error performing DELETE request:', error);
      throw error;
    }
  }

  /**
   * Perform a PATCH request to the API.
   * @param url - The URL for the request.
   * @param data - The data to send in the request body.
   * @returns A promise that resolves to the response data.
   * @throws An error if the request fails.
   */
  async patch(url: string, data: any): Promise<any> {
    try {
      const response = await CapacitorHttp.patch({
        url: ApiService.baseUrl + url,
        headers: await ApiService.getHeaders(),
        data,
      });
      return response;
    } catch (error) {
      console.error('Error performing PATCH request:', error);
      throw error;
    }
  }
}
