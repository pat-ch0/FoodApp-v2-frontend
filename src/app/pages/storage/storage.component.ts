import { Component, OnInit } from '@angular/core';
import { StorageType } from 'src/app/types/storage.type';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '@service/storage/storage.service'
import { HandleError } from '@service/errors/handle-error.service'
import ModalCreator from '@service/modal.service'
import { Validators } from '@angular/forms'

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})

export class StorageComponent implements OnInit {
  async addStorageClick(storage: StorageType) {
    try {
      const response = await this.storageService.addStorage(storage.id)
      this.storages.push(response.data)
    }
    catch (error: any) {
      this.handleError.handleError(error, 'STORAGE_PAGE', 'STORAGE_NOT_FOUND', 'ERROR_FETCHING_INFOS')
    }
  }

  async presentModal() {
    await this.modalCreator.createFormModal(this.addStorageClick.bind(this), [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        validators: [Validators.required]
      }
    ]);
  }

  storages: Array<StorageType> = []
  
  constructor(
    private alertController: AlertController,
    private route: Router,
    private storageService: StorageService,
    private handleError: HandleError,
    private modalCreator: ModalCreator
  ) {}

  ngOnInit() {
    this.storages.push({
      name: 'Home',
      icon: 'pantry.png',
      id: '1'
    });

    this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });
    this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    }); this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    }); this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    }); this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });
  }

  async onDeleteStorage(storage: StorageType) {
    console.log(this.alertController)
    const alert = await this.alertController.create({
      header: `Delete ${storage.name}`,
      message: `Are you sure you want to delete the storage ${storage.name} ?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            console.log('Yes button clicked');
            try {
              await this.storageService.deleteStorage(storage.id)
            }
            catch (error: any) {
              this.handleError.handleError(error, 'STORAGE_PAGE', 'STORAGE_NOT_FOUND', 'ERROR_FETCHING_INFOS')
            }
          }
        },
        'No'
      ],
    });

    await alert.present();
  }

  async onEditStorage(storage: StorageType) {
    try {
      const response = await this.storageService.editStorage(storage.id, storage.name)
      console.log(response.data)
    }
    catch (error: any) {
      this.handleError.handleError(error, 'STORAGE_PAGE', 'STORAGE_NOT_FOUND', 'ERROR_FETCHING_INFOS')
    }
  }

  // passer le storage dans le bind
  async presentEditModal() {
    await this.modalCreator.createFormModal(this.onEditStorage.bind(this), [
      {
        name: 'name',
        label: 'New name',
        type: 'text',
        validators: [Validators.required]
      }
    ]);
  }

  onClickStorage(storage: StorageType) {
    console.log('Storage clicked', storage);
    this.route.navigate(['/product-stock'], { queryParams: storage });
  }
}