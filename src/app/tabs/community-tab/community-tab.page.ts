import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ModalCreator from '@service/modal.service';
import { Community } from '@type/community.type';
import { CommunityService } from '@service/community/community.service'
import { HandleError } from '@service/errors/handle-error.service'

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
    private handleError: HandleError
  ) { }

  communities: Community[] = []

  // A verifier
  async addCommunity(community: Community) {
    try {
      const response = await this.communityService.addCommunity(community.id)
      this.communities[this.communities.length] = response.data
    }
    catch (error: any) {
      this.handleError.handleError(error, 'COMMUNITY_PAGE', 'COMMUNITY_NOT_FOUND', 'ERROR_FETCHING_INFOS')
    }
  }

  // A vérifier
  async onDeleteCommunity(community: Community) {
    try {
      const response = await this.communityService.deleteCommunity(community.id)
      console.log(response.data)
    }
    catch (error: any) {
      this.handleError.handleError(error, 'COMMUNITY_PAGE', 'COMMUNITY_NOT_FOUND', 'ERROR_FETCHING_INFOS')
    }
  }


  // A vérifier
  async onEditCommunity(community: Community) {
    try {
      const response = await this.communityService.editCommunity(community.id, community.name)
      console.log(response.data)
    }
    catch (error: any) {
      this.handleError.handleError(error, 'COMMUNITY_PAGE', 'COMMUNITY_NOT_FOUND', 'ERROR_FETCHING_INFOS')
    }
  }

  async presentModal() {
    await this.modalCreator.createFormModal(this.addCommunity.bind(this), [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        validators: [Validators.required]
      }
    ]);
  }

  // a verifier
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

  onClickCommunity(community: Community) {
    this.route.navigate(['/storage', community.id]);
  }

  ngOnInit() {
    this.communities.push({
      id: '1',
      name: 'Community 1',
      members: [
        {
          id: 1,
          firstname: 'User 1',
          lastname: 'User 1',
          birthdate: new Date(),
          email: '',
        },
        {
          id: 2,
          firstname: 'User 2',
          lastname: 'User 2',
          birthdate: new Date(),
          email: '',
        }

      ]
    });

    this.communities.push({
      id: '2',
      name: 'Community 2',
      members: [
        {
          id: 1,
          firstname: 'User 1',
          lastname: 'User 1',
          birthdate: new Date(),
          email: '',
        },
        {
          id: 4,
          firstname: 'User 4',
          lastname: 'User 4',
          birthdate: new Date(),
          email: '',
        }
      ]
    });
  }
}