import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IdbCrudService } from 'src/app/service-idb/idb-crud.service';
import { AdminDialogComponent } from '../adminodialog/admin-dialog.component';
import {SyncControlService} from '../../service/sync-control.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-scanned-data',
  templateUrl: './scanned-data.component.html',
  styleUrls: ['./scanned-data.component.scss']
})
export class ScannedDataComponent implements OnInit {
  @Input()
  tableData;
  login;
  email;
  displayedColumns: string[] = ['id', 'barcode'];
  public dialogRef: MatDialogRef<AdminDialogComponent>;
  constructor(public idb: IdbCrudService,public dialog: MatDialog, public sync:SyncControlService) { }

  ngOnInit(): void {
  }

  onExport():void {
    this.idb.read('login', 1).subscribe(i => {
      this.login = i;
      if(!this.login['email']) {
        this.openDialog();
      }else{
        this.onEmail();
      }
    });
  }

  openDialog(): void {
    if (!this.dialogRef?.componentInstance) {
      this.dialogRef = this.dialog.open(AdminDialogComponent, {
        id: 'admin-dialog',
        data: {
          emailReq: true,
        }
      });
    }
    
    this.dialogRef.afterClosed().subscribe(result => {
        this.email = result;
        this.onEmail();
    });

  }

  onEmail():void {
    this.idb.delete('login',1).subscribe(res => {
      this.login.email = this.email; 
      this.idb.put('login',this.login);
      this.sync.syncDataCloud(this.login);
    });
  }

}
