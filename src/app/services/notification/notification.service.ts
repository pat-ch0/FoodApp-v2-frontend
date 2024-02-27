import { Injectable } from '@angular/core';
import {
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed,
} from '@capacitor/push-notifications';
import NotificationApiService from './notification-api.service';

/**
 * Service responsible for handling push notifications.
 */
@Injectable({
  providedIn: 'root',
})
export default class NotificationService {
  /**
   * Initializes the NotificationService.
   * @param notificationApiService - The service for interacting with the notification API.
   */
  constructor(private notificationApiService: NotificationApiService) {
    console.log('Initializing notification');
    this.initializePushNotifications();
  }

  /**
   * Initializes push notifications and adds event listeners.
   * @returns A promise that resolves when push notifications are initialized.
   */
  private async initializePushNotifications(): Promise<void> {
    const permissionStatus = await PushNotifications.requestPermissions();
    if (permissionStatus.receive === 'granted') {
      PushNotifications.register();
      this.addEventListeners();
    } else {
      console.error('Push notification permission was denied');
    }
  }

  /**
   * Adds event listeners for push notifications.
   */
  private addEventListeners(): void {
    PushNotifications.addListener('registration', this.onRegistration.bind(this));
    PushNotifications.addListener('registrationError', this.onRegistrationError.bind(this));
    PushNotifications.addListener('pushNotificationReceived', this.onPushNotificationReceived.bind(this));
    PushNotifications.addListener('pushNotificationActionPerformed', this.onPushNotificationActionPerformed.bind(this));
  }

  /**
   * Handles the registration event for push notifications.
   * @param token - The registration token.
   */
  private onRegistration(token: Token): void {
    console.log('Push registration success, token: ' + token.value);
    this.notificationApiService.sendMyTokenPhone(token.value);
  }

  /**
   * Handles errors that occur during push notification registration.
   * @param error - The registration error.
   */
  private onRegistrationError(error: any): void {
    console.error('Error on registration: ' + JSON.stringify(error));
  }

  /**
   * Handles the event when a push notification is received.
   * @param notification - The received push notification.
   */
  private onPushNotificationReceived(notification: PushNotificationSchema): void {
    alert('Push received: ' + JSON.stringify(notification));
  }

  /**
   * Handles the event when a push notification action is performed.
   * @param notification - The push notification action performed.
   */
  private onPushNotificationActionPerformed(notification: ActionPerformed): void {
    alert('Push action performed: ' + JSON.stringify(notification));
  }
}
