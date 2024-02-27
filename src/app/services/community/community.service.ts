import { Injectable } from '@angular/core'
import { ApiService } from '../api.service'
import { environment } from '@environment/environment'

@Injectable({
    providedIn: 'root',
})

export class CommunityService {
    constructor(private apiService: ApiService) {}

    async addCommunity(id: string): Promise<any> {
        return this.apiService.get(`${environment.config.endpoint.community}${id}`)
    }

    async deleteCommunity(id: string): Promise<any> {
        return this.apiService.delete(`${environment.config.endpoint.community}${id}`)
    }

    async editCommunity(id: string, newName: string): Promise<any> {
        return this.apiService.patch(`${environment.config.endpoint.community}${id}`, newName)
    }
}