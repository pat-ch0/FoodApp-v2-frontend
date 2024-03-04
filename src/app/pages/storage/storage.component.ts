import { Component, OnInit } from '@angular/core';
import { StorageType } from '@Type/storage.type';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '@Service/storage/storage.service';
import { HandleError } from '@Service/errors/handle-error.service';
import ModalCreator from '@Service/modal.service';
import { Validators } from '@angular/forms';
import { CommunityService } from '@Service/community/community.service';
import { Community } from '@Type/community/community.type';
import { CommunityDataService } from '@Service/community/community_data.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
  storages: Array<StorageType> = []
  community!: { community: Community; userRoleLabel: string; }

  constructor(
    private alertController: AlertController,
    private route: Router,
    private storageService: StorageService,
    private communityService: CommunityService,
    private handleError: HandleError,
    private modalCreator: ModalCreator,
    private communityDataService: CommunityDataService
  ) {}

  ngOnInit() {

    this.communityDataService.currentCommunity.subscribe(community => {
      if (community) {
        this.community = community;
      } else {
        this.route.navigate(['']);
      }
    });

    this.loadStorages();
  }

  async addUserToCommunity({email} : {email: string}) {
    console.log(email)
    try {
      await this.communityService.addUserToCommunity(email, this.community.community.id)
    }
    catch (error: any) {
      
    }
    this.handleError.showToast('USER_ADDED', 'success')
  }

  async presentModalAddUser() {
    await this.modalCreator.createFormModal(this.addUserToCommunity.bind(this), [
      {
        name: 'email',
        label: 'email',
        type: 'text',
        validators: [Validators.required, Validators.email]
      }
    ]);
  }

  /**
   * Asynchronously loads the list of storages from the server.
   * Updates the component's 'storages' property upon successful retrieval.
   * @returns A promise that resolves when the storages are loaded.
   */
  async loadStorages(): Promise<void> {
    try {
      // Fetch the list of storages from the backend
      const storageList = await this.storageService.getAllStorages();

      // Update the component's 'storages' property with the retrieved data
      this.storages = storageList.data;
    } catch (error: any) {
      // Handle errors that may occur during the loading process
      console.error('Error loading storages', error);
    }
  }

  async addStorageClick(storageFormData: any) {
    try {
      const storage: StorageType = {
        label: storageFormData.label,
        type: storageFormData.type,
        icon: `${storageFormData.type.toLowerCase()}.png`,
      };

      console.log(storage);

      const response = await this.storageService.addStorage(storage);
      this.storages.push(response.data);
    } catch (error: any) {
      this.handleError.handleError(
        error,
        'STORAGE_PAGE',
        'STORAGE_NOT_FOUND',
        'ERROR_FETCHING_INFOS'
      );
    }
  }

  async presentModal() {
    const storageTypes = ['Fridge', 'Freezer', 'Pantry'];
    await this.modalCreator.createFormModal(this.addStorageClick.bind(this), [
      {
        name: 'label',
        label: 'Name',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'type',
        label: 'Storage Type',
        type: 'select',
        options: storageTypes.map((type) => ({ value: type, label: type })),
        validators: [Validators.required],
      },
    ]);
  }

  async onDeleteStorage(storage: StorageType) {
    console.log(this.alertController);
    const alert = await this.alertController.create({
      header: `Delete ${storage.label}`,
      message: `Are you sure you want to delete the storage ${storage.label} ?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            console.log('Yes button clicked');
            if (!storage.id) throw new Error('No storage id provided');

            try {
              await this.storageService.deleteStorage(storage.id);
              this.loadStorages();
            } catch (error: any) {
              this.handleError.handleError(
                error,
                'STORAGE_PAGE',
                'STORAGE_NOT_FOUND',
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

  async onEditStorage(formData: any, storage: StorageType) {
    try {
      const updatedStorage: StorageType = {
        id: storage.id,
        label: formData.label,
        type: formData.type,
        icon: `${formData.type.toLowerCase()}.png`,
      };

      console.log(updatedStorage);

      const response = await this.storageService.updateStorage(updatedStorage);
      console.log(response.data);
      this.loadStorages();
    } catch (error: any) {
      this.handleError.handleError(
        error,
        'STORAGE_PAGE',
        'STORAGE_NOT_FOUND',
        'ERROR_FETCHING_INFOS'
      );
    }
  }

  // passer le storage dans le bind
  async presentEditModal(storage: StorageType) {
    const storageTypes = ['Fridge', 'Freezer', 'Pantry'];

    await this.modalCreator.createFormModal(
      (formData: any) => this.onEditStorage(formData, storage),
      [
        {
          name: 'label',
          label: 'Name',
          type: 'text',
          validators: [Validators.required],
        },
        {
          name: 'type',
          label: 'Storage Type',
          type: 'select',
          options: storageTypes.map((type) => ({ value: type, label: type })),
          validators: [Validators.required],
        },
      ],
      storage
    );
  }

  onClickStorage(storage: StorageType) {
    console.log('Storage clicked', storage);
    this.route.navigate(['/product-stock'], { queryParams: storage });
  }
}
