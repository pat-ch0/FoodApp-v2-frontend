import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@Auth/auth.service';
import { UserService } from '@Service/user.service';
import { User } from '@Type/user.type';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;

  private _showPassword = false;

  birthdate: string = '';
  minDate: string = '1900-01-01';
  maxDate: string = new Date().toISOString();

  @ViewChild('datePicker') datePicker: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.formBuilder.group({
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

  get birthdateValue() {
    return this.signupForm.get('birthdate');
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
  async onSubmit() {
    if (this.signupForm.valid) {
      const dateForBackend = new Date(this.signupForm.value.birthdate);
      const form: User = {
        firstname: this.signupForm.get('firstName')?.value,
        lastname: this.signupForm.get('lastName')?.value,
        email: this.signupForm.get('email')?.value,
        birthdate: dateForBackend,
      };
      // this.signupForm.value.password
      console.log('Form:', form);
      const response = await this.userService.createUser(
        form,
        this.signupForm.value.password
      );
      if (response.status === 200) {
        this.router.navigate(['/tabs/search']);
      }
    } else {
      console.log('Form is not valid. Please check the fields.');
    }
  }
}
