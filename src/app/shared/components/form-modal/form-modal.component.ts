import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormFiels } from '@type/formField.type';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  @Input() formFields!: FormFiels[];
  @Input() onSubmit!: (param: any) => Promise<void>;
  form!: FormGroup;

  constructor(private fb: FormBuilder,
      private modalCtrl: ModalController
    ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    const group: any = {};
    this.formFields.forEach(field => {
      group[field.name] = ['', field.validators];
    });
    this.form = this.fb.group(group);
  }

  async submitForm() {
    await this.onSubmit(this.form.value);
    this.closeModal();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
