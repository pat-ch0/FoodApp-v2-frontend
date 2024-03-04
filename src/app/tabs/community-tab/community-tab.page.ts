import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ModalCreator from '@service/modal.service';
import { Community } from '@type/community/community.type';
import { CommunityService } from '@service/community/community.service'
import { HandleError } from '@service/errors/handle-error.service'
import { City } from '@type/community/city.type';
import { CommunityDataService } from '@service/community/community_data.service';

@Component({
  selector: 'app-community-tab',
  templateUrl: './community-tab.page.html',
  styleUrls: ['./community-tab.page.scss'],
})
export class CommunityTabPage implements OnInit {
  constructor(
    private route: Router,
    private modalCreator: ModalCreator,
    private communityService: CommunityService,
    private handleError: HandleError,
    private communityDataService: CommunityDataService
  ) { }

  communities: ({"community": Community, userRoleLabel: string})[] = []
  private cities: City[] = [];


  // A verifier
  async addCommunity(community: Community) {
    const city = this.cities.find(city => city.id === parseInt(community.city as any))
    if(!city) throw new Error('City not found')
    community.city = city;
    console.log(community)
    try {
      const newCommu = await this.communityService.createCommunity(community)
      this.communities.push(newCommu)
    }
    catch (error: any) {
      this.handleError.handleError(error, 'COMMUNITY_PAGE', 'COMMUNITY_NOT_FOUND', 'ERROR_FETCHING_INFOS')
    }
  }

  // A vérifier
  async onDeleteCommunity(community: Community) {
    try {
      const response = await this.communityService.deleteCommunity(community.id)
      if(response) this.communities = this.communities.filter(commu => commu.community.id !== community.id)
    }
    catch (error: any) {
      this.handleError.handleError(error, 'COMMUNITY_PAGE', 'COMMUNITY_NOT_FOUND', 'ERROR_FETCHING_INFOS')
    }
  }


  // A vérifier
  async onEditCommunity(community: Community) {
    try {
      const response = await this.communityService.editCommunity(community.id, community.label)
      console.log(response.data)
    }
    catch (error: any) {
      this.handleError.handleError(error, 'COMMUNITY_PAGE', 'COMMUNITY_NOT_FOUND', 'ERROR_FETCHING_INFOS')
    }
  }

  async presentModal() {
    await this.modalCreator.createFormModal(this.addCommunity.bind(this), 
    [
      {
        name: 'label',
        label: 'Name',
        type: 'text',
        validators: [Validators.required]
      },
      {
        name: 'address',
        label: 'Address',
        type: 'text',
        validators: [Validators.required]
      },
      {
        name: 'addressDetail',
        label: 'Address detail',
        type: 'text',
        validators: [Validators.required]
      },
      {
        name: 'city',
        label: 'City',
        type: 'select',
        options: this.cities.map(city => ({ value: city.id.toString(), label: city.name })),
        validators: [Validators.required]
      }
    ]);
  }

  async presentEditModal() {
    await this.modalCreator.createFormModal(this.onEditCommunity.bind(this), [
      {
        name: 'name',
        label: 'New name',
        type: 'text',
        validators: [Validators.required]
      }
    ]);
  }

  onClickCommunity(community: { community: Community; userRoleLabel: string; }) {
    this.communityDataService.changeCommunity(community)
    this.route.navigate(['storage', community.community.id])
  }

  async ngOnInit() {
    this.cities = await this.communityService.getAllCities()
    await (await this.communityService.getCommunities()).forEach(async communitydd => {
      console.log(communitydd)
      this.communities.push(communitydd)
    })
    console.log(this.communities)
  }
}