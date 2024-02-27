import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private menuController: MenuController,
    private navCtrl: NavController
  ) {}
  menuType: 'overlay' | 'reveal' | 'push' = 'overlay';
  openMenu() {
    this.menuController.open('menu-tab');
  }

  navigateTo(tab: string) {
    this.navCtrl.navigateForward(`tabs/${tab}`);
  }
}
