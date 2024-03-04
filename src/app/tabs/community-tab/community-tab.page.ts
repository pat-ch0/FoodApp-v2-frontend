import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ModalCreator from '@Service/modal.service';
import { Community } from '@Type/community/community.type';
import { CommunityService } from '@Service/community/community.service';
import { HandleError } from '@Service/errors/handle-error.service';
import { City } from '@Type/community/city.type';
import { CommunityDataService } from '@Service/community/community_data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-community-tab',
  templateUrl: './community-tab.page.html',
  styleUrls: ['./community-tab.page.scss'],
})
export class CommunityTabPage implements OnInit {
  communities: { community: Community; userRoleLabel: string }[] = [];
  private cities: City[] = [];

  constructor(
    private route: Router,
    private modalCreator: ModalCreator,
    private communityService: CommunityService,
    private handleError: HandleError,
    private communityDataService: CommunityDataService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCities();
    this.loadCommunities();
  }

  async loadCities() {
    this.cities = await this.communityService.getCities();
  }

  async loadCommunities() {
    this.communities = await this.communityService.getCommunities();
    console.log(this.communities);
  }

  // A verifier
  async addCommunity(community: Community) {
    const city = this.cities.find(
      (city) => city.id === parseInt(community.city as any)
    );
    if (!city) throw new Error('City not found');
    community.city = city;
    console.log(community);
    try {
      const newCommu = await this.communityService.createCommunity(community);
      this.communities.push(newCommu);
    } catch (error: any) {
      this.handleError.handleError(
        error,
        'COMMUNITY_PAGE',
        'COMMUNITY_NOT_FOUND',
        'ERROR_FETCHING_INFOS'
      );
    }
  }

  // A vérifier
  async onDeleteCommunity(community: Community) {
    const alert = await this.alertController.create({
      header: `Delete ${community.label}`,
      message: `Are you sure you want to delete ${community.label} ?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            try {
              const response = await this.communityService.deleteCommunity(
                community.id
              );
              if (response)
                this.communities = this.communities.filter(
                  (commu) => commu.community.id !== community.id
                );
            } catch (error: any) {
              this.handleError.handleError(
                error,
                'COMMUNITY_PAGE',
                'COMMUNITY_NOT_FOUND',
                'ERROR_FETCHING_INFOS'
              );
            }
          },
        },
        'No',
      ],
    });
    await alert.present();
  }

  // A vérifier
  async onEditCommunity(community: Community) {
    try {
      const response = await this.communityService.editCommunity(
        community.id,
        community.label
      );
      console.log(response.data);
    } catch (error: any) {
      this.handleError.handleError(
        error,
        'COMMUNITY_PAGE',
        'COMMUNITY_NOT_FOUND',
        'ERROR_FETCHING_INFOS'
      );
    }
  }

  async presentModal() {
    await this.modalCreator.createFormModal(this.addCommunity.bind(this), [
      {
        name: 'label',
        label: 'Name',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'address',
        label: 'Address',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'addressDetail',
        label: 'Address detail',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'city',
        label: 'City',
        type: 'select',
        options: this.cities.map((city) => ({
          value: city.id.toString(),
          label: city.name,
        })),
        validators: [Validators.required],
      },
    ]);
  }

  async presentEditModal() {
    await this.modalCreator.createFormModal(this.onEditCommunity.bind(this), [
      {
        name: 'name',
        label: 'New name',
        type: 'text',
        validators: [Validators.required],
      },
    ]);
  }

  onClickCommunity(community: { community: Community; userRoleLabel: string }) {
    this.communityDataService.changeCommunity(community);
    this.route.navigate(['storage', community.community.id]);
  }
}
