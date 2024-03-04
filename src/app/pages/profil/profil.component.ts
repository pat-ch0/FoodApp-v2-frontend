import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { UserService } from '@service/user.service';
import { User } from '@type/user.type';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }
  user!: User
  async ngOnInit() {

    this.user = await this.userService.getUser();
    console.log(this.user)
  }

  // loginForm: FormGroup;

  alertButtons = ['Yes', 'No'];
  factorVerify = true
  isEditMode: boolean = false;

  toggleEditMode() {
    console.log("cc")
    this.isEditMode = !this.isEditMode
  }

  verifEditMode()
  {
    
  }
}
