import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from '@Auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private menuController: MenuController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}
  menuType: 'overlay' | 'reveal' | 'push' = 'overlay';
  openMenu() {
    this.menuController.open('menu-tab');
  }

  navigateTo(tab: string) {
    this.navCtrl.navigateForward(`tabs/${tab}`);
  }

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('');
  }
}
