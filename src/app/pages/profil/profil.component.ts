import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { UserService } from '@service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent  implements OnInit {
  
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

  ngOnInit() {
  }

  // loginForm: FormGroup;

  alertButtons = ['Yes','No'];
  factorVerify = false
  changeSelect: boolean = false
  userDetails?: UserService

  getUserDetails(userDetails: UserService) {

    this.getUserDetails
    console.log(userDetails);
    return userDetails
}
  
}
