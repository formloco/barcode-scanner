import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IdbCrudService } from 'src/app/service-idb/idb-crud.service';
import { AppService } from 'src/app/service/app.service';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pinCode: string;
  @Output() loggedInEmitter = new EventEmitter<boolean>();
  loggedIn:boolean;

  @ViewChild('sidenav') sidenav: MatSidenav;

  token;
  templates;
  idbData;
  templateControls;
  tableData;
  templateForm: FormGroup;

  page;
  fileArray = [];
  isError = false;
  isMainMenu = true;
  isRightMenu = false;
  isImportOpen = false;
  isLookuplist = true;

  public login;
  constructor(private router: Router, public idb: IdbCrudService,  private authService: AuthService, public appService: AppService,private formBuilder: FormBuilder) {
    this.templateForm = this.formBuilder.group({
      templateArray: this.formBuilder.array([])
    });
   }


  ngOnInit() {
    this.scannedData();
  }

  close(reason: string) {
    this.sidenav.close();
  }

  closeOverlay() {
    this.isImportOpen = false;
  }

  goHome() {
    this.authService.loginStatus = false;
    this.router.navigate(['']);
  }

  openList() {
    this.appService.isData = false;
  }

  scannedData() {
      this.idb.readAll('data').subscribe(data => {
        this.idbData = data;
        if (this.idbData.length > 0) {
          this.tableData = this.idbData.map(d => {
            return {
              id: d['id'],
              barcode: d['BarCodeScanner0']
            }
          });
        }
      });
  }


}