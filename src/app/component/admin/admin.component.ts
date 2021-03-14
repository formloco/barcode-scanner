import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import { AdminDialogComponent } from '../adminodialog/admin-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { IdbCrudService } from 'src/app/service-idb/idb-crud.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pinCode: string;
  @Output() loggedInEmitter = new EventEmitter<boolean>();
  loggedIn:boolean;

  public dialogRef: MatDialogRef<AdminDialogComponent>;
  public login;
  constructor(public dialog: MatDialog, public idb: IdbCrudService, private errorService: ErrorService) { }


  verify(): void {
    this.idb.read('login', 1).subscribe(i => {
      this.login = i;
      this.openDialog();
    });
  }


  openDialog(): void {
    console.log(this.loggedIn);
    if (!this.dialogRef?.componentInstance && !this.loggedIn) {
      this.dialogRef = this.dialog.open(AdminDialogComponent, {
        id: 'admin-dialog',
        data: {
          login: !!this.login
        }
      });
    }
    
    this.dialogRef.afterClosed().subscribe(result => {
      if (!this.login) {
        this.onPincode(result);
      } else if (result == this.login['pincode']) {
        this.loggedInEmitter.emit(true);
        this.loggedIn = true;
      } else {
        this.errorService.popSnackbar('Pin is Required');
      }
    });
  }



  ngOnInit(): void {

  }

  onPincode(pin: number) {

    this.idb.put('login',
      {
        'pincode': pin,
        'tenant_id': uuidv4()
      });
  }


}