import { Component } from '@angular/core';
import { AuthService } from '@service/auth.service';
import NotificationService from '@service/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private notificationService : NotificationService,
    private authService: AuthService
  )
   {}

   

  async ngOnInit() {
    const isLoggedIn = await this.authService.isUserLoggedIn();
    if (isLoggedIn) {
      console.log('L\'utilisateur est connecté');
      // Navigation vers l'écran d'accueil
    } else {
      console.log('L\'utilisateur n\'est pas connecté');
      // Redirection vers l'écran de connexion
    }
  }
}