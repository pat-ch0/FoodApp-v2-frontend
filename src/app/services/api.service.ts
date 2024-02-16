import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';

/**
 * Service for making HTTP requests to the API.
 */
@Injectable({
    providedIn: 'root'
})
export abstract class ApiService {
    private static userToken: string = 'YOUR_USER_TOKEN_HERE';
    private static baseUrl = environment.config.API_GATEWAY;

    /**
     * Get the headers for the HTTP request.
     * @returns The headers object.
     */
    private getHeaders() {
        return {
            'Authorization': `Bearer ${ApiService.userToken}`,
            'Content-Type': 'application/json'
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
                headers: this.getHeaders(),
                params
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
                headers: this.getHeaders(),
                data
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
                headers: this.getHeaders(),
                params
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
                headers: this.getHeaders(),
                data
            });
            return response;
        } catch (error) {
            console.error('Error performing PATCH request:', error);
            throw error;
        }
    }
}