import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@Auth/auth.service';
import { UserService } from '@Service/user.service';
import { User } from '@Type/user.type';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {

  // Form modification
  signupFormPerso: FormGroup = new FormGroup({});
  private _showPassword = false;

  date = new Date();
  birthdate: string = '';
  minDate: string = '1900-01-01';
  maxDate: string = new Date().toISOString();



  @ViewChild('datePicker') datePicker: any;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,

  ) { }

  user!: User
  async ngOnInit() {

    if ((await this.authService.isUserLoggedIn() === false)) {
      this.router.navigate(['/home']);
      return;
    }
    
    this.user = await this.userService.getUser();
    console.log(this.user)
    this.initForm();
  }

  /**
 * Initialize the signup form with form controls and validators
 *
 */
  initForm() {

    // this.signupForm = this.formBuilder.group(
    //   {
    //     firstName: ['', [Validators.required, Validators.minLength(2)]],
    //     lastName: ['', [Validators.required, Validators.minLength(4)]],
    //     email: ['', [Validators.required, Validators.email]],
    //     birthdate: [this.birthdate, Validators.required],
    //     password: ['', [Validators.required, Validators.minLength(6)]],
    //     confirmPassword: [
    //       '',
    //       [Validators.required, this.passwordMatchValidator],
    //     ],
    //     termsAndPolicy: [false, Validators.requiredTrue],
    //   },
    //   {
    //     validator: this.passwordMatchValidator,
    //   }
    // );

    this.signupFormPerso = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]],
        birthdate: [this.birthdate, Validators.required],
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
    return this.signupFormPerso.get('birthdate')
  }


  openDatePicker() {
    this.datePicker.present();
  }

  // loginForm: FormGroup;

  alertButtons = ['Yes', 'No'];
  factorVerify = true
  isEditMode: boolean = false;

  toggleEditMode() {
    console.log("cc")
    this.isEditMode = !this.isEditMode
  }

  verifEditMode() {

  }

  // Form modfiication

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
    if (this.signupFormPerso.valid) {
      const dateForBackend = new Date(this.signupFormPerso.value.birthdate);
      const form: User = {
        firstname: this.signupFormPerso.get('firstName')?.value,
        lastname: this.signupFormPerso.get('lastName')?.value,
        email: this.signupFormPerso.get('email')?.value,
        birthdate: dateForBackend,
      };
      // this.signupForm.value.password
      console.log('Form:', form);
      const responce = await this.userService.createUser(form, this.signupFormPerso.value.password);
      if (responce.status === 200) {
        this.router.navigate(['/tabs/search']);
      }
    } else {
      console.log('Form is not valid. Please check the fields.');
    }
  }

  onDateChange(event: CustomEvent) {
    const selectedDate = new Date(event.detail.value);
    const formattedDate = this.formatDate(selectedDate.toISOString());
    console.log("chage" + formattedDate)
    this.signupFormPerso.get('birthdate')?.setValue(formattedDate);
  }

  getBirthdate() {
    this.date = new Date(this.user.birthdate)
    const year = this.date.getFullYear();
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0'); // +1 car les mois commencent à 0
    const day = this.date.getDate().toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    console.log("get" + formattedDate)
    this.signupFormPerso.get('birthdate')?.setValue(formattedDate);
  }
}
