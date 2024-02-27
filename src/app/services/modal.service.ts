import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormModalComponent } from "../shared/components/form-modal/form-modal.component";
import { FormField } from "@type/formField.type";


@Injectable({
    providedIn: 'root'
})
export default class ModalCreator {

    constructor(private modalCtrl: ModalController) { }

    public async createFormModal(submitCallback: (params: any) => Promise<void>, formFields: FormField[]) {
        const modal = await this.modalCtrl.create({
            component: FormModalComponent,
            breakpoints: [0, 0.4, 1],
            initialBreakpoint: 0.4,
            componentProps: {
                onSubmit: submitCallback,
                formFields: formFields
            }
        });
        await modal.present();
    }
}