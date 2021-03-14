import { Component, OnInit } from '@angular/core';

import * as uuid from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AuthService } from "../../service/auth.service";
import { AppService } from "../../service/app.service";

import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  ngOnInit(): void {
   
  }

 

}