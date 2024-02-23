import { Component, OnInit } from '@angular/core';
import { StorageType } from 'src/app/types/storage.type';
@Component({
  selector: 'app-storage-tab',
  templateUrl: './storage-tab.page.html',
  styleUrls: ['./storage-tab.page.scss'],
})
export class StorageTabPage implements OnInit {

  storages: Array<StorageType> = [];
  constructor() { }

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

}
