import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../service/auth.service";
import { ErrorService } from "../../service/error.service";

import { environment } from '../../../environments/environment';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  auth;
  token;

  pin = environment.pin;
  pinForm: FormGroup;

  constructor(
    private router: Router,
    public appService: AppService,
    private fb: FormBuilder,
    private authService: AuthService,
    private errorService: ErrorService) { 
    this.pinForm = this.fb.group({
      pin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  // checkPIN() {
  //   if (this.adminPin == this.pinForm.controls['pin'].value) {
  //     this.authService.token().subscribe(token => {
  //       this.token = token;
  //       localStorage.setItem('formToken', this.token.token);
  //       this.authService.loggedInStatus = true;
  //       this.router.navigate(['templates']);
  //     });
  //   }
  //   else this.errorService.popSnackbar('Incorrect PIN');
  // }

  // goTemplates() {
  //   this.authService.loggedInStatus = false;
  //   this.router.navigate(['templates']);
  // }

  loginPIN() {
    if (this.appService.tenantID !== undefined) {
      /**
       * Todo: got to server with tenantID and get/sync form data
       * will need to pass form_id found in form model
       */
    }

    if (this.pin == this.pinForm.controls['pin'].value) {
      // this.authService.loginStatus = true;
      this.appService.isSignin = true;
      this.appService.isPin = false;
    }
    else
      this.errorService.popSnackbar('Incorrect PIN');
  }

  goHome() {
    this.authService.loginStatus = false;
    this.appService.isPin = false;
  }

}
