import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ModalCreator from '@service/modal.service';
import { Community } from '@type/community.type';
import { CommunityService } from '@service/community/community.service'

@Component({
  selector: 'app-community-tab',
  templateUrl: './community-tab.page.html',
  styleUrls: ['./community-tab.page.scss'],
})
export class CommunityTabPage implements OnInit {


  constructor(
    private route: Router,
    private modalCreator: ModalCreator,
    private communityService: CommunityService
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
      console.log("Can not add community")
      // handle error
    }
  }

  async presentModal() {
    await this.modalCreator.createFormModal(this.addCommunity, [
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