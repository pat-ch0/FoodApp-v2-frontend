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

/**
 * Represents the StorageComponent class.
 * This component is responsible for managing storage-related functionality.
 */
@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
  storages: Array<StorageType> = [];
  community!: { community: Community; userRoleLabel: string; };

  constructor(
    private alertController: AlertController,
    private route: Router,
    private storageService: StorageService,
    private communityService: CommunityService,
    private handleError: HandleError,
    private modalCreator: ModalCreator,
    private communityDataService: CommunityDataService
  ) {}

  /**
   * Initializes the component.
   * Subscribes to the currentCommunity observable and loads the storages.
   * If there is no current community, navigates to the home page.
   */
  ngOnInit() {
    this.communityDataService.currentCommunity.subscribe(community => {
      if (community) {
        this.community = community;
        this.loadStorages();
      } else {
        this.route.navigate(['']);
      }
    });
  }

  /**
   * Adds a user to the current community.
   * @param email - The email of the user to be added.
   */
  async addUserToCommunity({email} : {email: string}) {
    console.log(email);
    try {
      await this.communityService.addUserToCommunity(email, this.community.community.id);
    }
    catch (error: any) {
      
    }
    this.handleError.showToast('USER_ADDED', 'success');
  }

  /**
   * Presents a modal for adding a user to the community.
   */
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
      const storageList = await this.storageService.getAllStorages(this.community.community.id);
      this.storages = storageList.data;
    } catch (error: any) {
      console.error('Error loading storages', error);
    }
  }

  /**
   * Handles the click event for adding a storage.
   * @param storageFormData - The form data for the new storage.
   */
  async addStorageClick(storageFormData: any) {
    try {
      const storage: StorageType = {
        label: storageFormData.label,
        type: storageFormData.type,
        communityId: this.community.community.id,
        icon: `${storageFormData.type.toLowerCase()}.png`,
      };
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

  /**
   * Presents a modal for adding a storage.
   */
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

  /**
   * Handles the click event for deleting a storage.
   * @param storage - The storage to be deleted.
   */
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

  /**
   * Handles the click event for editing a storage.
   * @param formData - The form data for the updated storage.
   * @param storage - The storage to be updated.
   */
  async onEditStorage(formData: any, storage: StorageType) {
    try {
      const updatedStorage: StorageType = {
        id: storage.id,
        label: formData.label,
        communityId: this.community.community.id,
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

  /**
   * Presents a modal for editing a storage.
   * @param storage - The storage to be edited.
   */
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

  /**
   * Handles the click event for a storage.
   * Navigates to the product stock page with the selected storage as a query parameter.
   * @param storage - The clicked storage.
   */
  onClickStorage(storage: StorageType) {
    console.log('Storage clicked', storage);
    this.route.navigate(['/product-stock'], { queryParams: storage });
  }
}