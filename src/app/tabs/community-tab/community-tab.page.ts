import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ModalCreator from '@service/modal.service';
import { Community } from '@type/community.type';
import { FormModalComponent } from 'src/app/shared/components/form-modal/form-modal.component';

@Component({
  selector: 'app-community-tab',
  templateUrl: './community-tab.page.html',
  styleUrls: ['./community-tab.page.scss'],
})
export class CommunityTabPage implements OnInit {


  constructor(
    private route: Router,
    private modalCreator: ModalCreator
  ) { }

  communities: Community[] = []

  onDeleteCommunity(community: Community) {

  }

  async addCommunity(params: any) {
    console.log(params)
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

  onClickCommynuty(community: Community) {
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
