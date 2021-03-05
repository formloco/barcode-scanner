import { Component, OnInit } from '@angular/core';

import * as uuid from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AuthService } from "../../service/auth.service";
import { AppService } from "../../service/app.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  token;
  form_id;
  tenant_id

  templateForm: FormGroup;

  fileArray = [];
  isError = false;
  isNotFile = true;
  isImportOpen = false;

  pinKeySecret = environment.pinKeySecret;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private appService: AppService) { 
      this.templateForm = this.formBuilder.group({
        templateArray: this.formBuilder.array([])
      });
    }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let obj = ({
      form_id: this.form_id,
      tenant_id: this.tenant_id
    }) 
    this.appService.getData(obj).subscribe(data => {
      console.log(data)
    });
  }

  closeOverlay() {
    this.isImportOpen = false;
  }

  goTemplates() {
    this.authService.loggedInStatus = false;
    this.router.navigate(['']);
  }

}