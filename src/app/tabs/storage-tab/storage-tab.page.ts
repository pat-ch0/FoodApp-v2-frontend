import { Component, Inject, OnInit } from '@angular/core';
import { StorageType } from 'src/app/types/storage.type';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storage-tab',
  templateUrl: './storage-tab.page.html',
  styleUrls: ['./storage-tab.page.scss'],
})
export class StorageTabPage implements OnInit {


  storages: Array<StorageType> = [];
  constructor(
    private alertController: AlertController,
    private route: Router
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
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
      name: 'Work',
      icon: 'fridge.png',
      id: '2'
    });this.storages.push({
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
          handler: () => {
            //Use API for delete the storage
            console.log('Yes button clicked');
          }
        },
        'No'
      ],
  
    });
  
    await alert.present();
  }

  onClickStorage(storage: StorageType) {
    console.log('Storage clicked', storage);
    this.route.navigate(['/product-stock'], { queryParams: storage });
  }
 

}
