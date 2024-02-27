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

  onDeleteCommunity(community: Community) {

  }

  async addCommunity(community: Community) {
    console.log(community)
    try {
      const response = await this.communityService.addCommunity(community.id);
      this.communities.push(response.data);
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

  onClickCommunity(community: Community) {
    this.route.navigate(['/storage', community.id]);
  }

  ngOnInit() {
    console.log(this.handleError)
    this.communities.push({
      id: '1',
      name: 'Community 1',
      members: [
        {
          id: '1',
          name: 'User 1'
        },
        {
          id: '2',
          name: 'User 2'
        }
      ]
    });

    this.communities.push({
      id: '2',
      name: 'Community 2',
      members: [
        {
          id: '1',
          name: 'User 1'
        },
        {
          id: '4',
          name: 'User 4'
        }
      ]
    });
  }
}