import { TranslateService } from '@ngx-translate/core'
import { ToastController } from '@ionic/angular'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})

export class HandleError {
    constructor(private toastController: ToastController, private translate: TranslateService) {}

    /**
    * Handles errors during fetching
    * @param error The error object received
    * @param pageName The name of the page in the translate file
    * @param error404 Error to display if it's a 404
    * @param notError404 Error to display if it isn't a 404
    */
    public handleError(error: {status: number}, pageName: string, error404: string, notError404: string) {
        const messageKey =
            error.status === 404
                ? `${pageName}.${error404}`
                : `${pageName}.${notError404}`
        this.showToast(messageKey, 'danger');
    }

    /**
    * Displays a toast notification with a custom message.
    * @param message The message to be displayed in the toast.
    */
    public showToast(key: string, color: 'success' | 'warning' | 'danger') {
        this.translate.get(key).subscribe(async (message: string) => {
            const toast = await this.toastController.create({
                message: message,
                duration: 2000,
                color: color, // 'success' for positive messages, 'warning' for caution, and 'danger' for errors
            });
            toast.present();
        });
    }
}