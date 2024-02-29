import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});

  private _showPassword = false;

  birthdate: string = '';
  minDate: string = '1900-01-01';
  maxDate: string = new Date().toISOString();

  @ViewChild('datePicker') datePicker: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialize the signup form with form controls and validators
   *
   */
  initForm() {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        birthdate: [this.birthdate, Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [
          '',
          [Validators.required, this.passwordMatchValidator],
        ],
        termsAndPolicy: [false, Validators.requiredTrue],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  /**
   * Getter for the showPassword property.
   * @returns {boolean} - The current state of the showPassword property.
   */
  get showPassword() {
    return this._showPassword;
  }

  get birthdateValue(){
    return this.signupForm.get('birthdate')
  }

  /**
   * Opens the date picker modal.
   */
  openDatePicker() {
    this.datePicker.present();
  }

  /**
   * Handles the date change event from the date picker.
   * @param event - The custom event containing the selected date.
   */
  onDateChange(event: CustomEvent) {
    const selectedDate = new Date(event.detail.value);
    const formattedDate = this.formatDate(selectedDate.toISOString());

    this.signupForm.get('birthdate')?.setValue(formattedDate);
  }

  /**
   * Formats the ISO date to a display-friendly format.
   * @param isoDate - The ISO date string to be formatted.
   * @returns {string} - The formatted date string.
   */
  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  /**
   * Toggles the visibility of the password.
   */
  togglePasswordVisibility() {
    this._showPassword = !this._showPassword;
  }

  /**
   * Custom validator to check if password and confirm password match.
   * @param group - The form group containing password and confirm password controls.
   * @returns {null|{mismatch: boolean}} - Null if passwords match, mismatch error object otherwise.
   */
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      group.get('confirmPassword')?.setErrors(null);
    } else {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
    }

    return null;
  }

  /**
   * Handles the form submission.
   */
  onSubmit() {
    if (this.signupForm.valid) {
      // Generate a salt and hash the password
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(
        this.signupForm.value.password,
        salt
      );

      const form = {
        firstName: this.signupForm.get('firstName')?.value,
        lastName: this.signupForm.get('lastName')?.value,
        email: this.signupForm.get('email')?.value,
        birthdate: this.signupForm.get('birthdate')?.value,
        password: hashedPassword,
      };

      console.log('Form:', form);
    } else {
      console.log('Form is not valid. Please check the fields.');
    }
  }
}
