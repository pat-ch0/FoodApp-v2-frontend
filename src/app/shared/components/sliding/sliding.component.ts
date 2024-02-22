import { Component, Input, OnInit, input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageType } from 'src/app/types/storage.type';
@Component({
  selector: 'app-sliding',
  templateUrl: './sliding.component.html',
  styleUrls: ['./sliding.component.scss'],
})
export class SlidingComponent implements OnInit {
  @Input() storage!: StorageType;

  constructor(private alertController: AlertController) { }

  async onClickDelete() {
    const alert = await this.alertController.create({
      header: `Delete ${this.storage.name}`,
      message: `Are you sure you want to delete the storage ${this.storage.name} ?`,
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

  onClickSliding() {
  }

  iconPath!: string;
  ngOnInit() {
    this.iconPath = `assets/icon/storage-icon/${this.storage.icon}`;
   }

}