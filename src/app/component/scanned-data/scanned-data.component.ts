import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IdbCrudService } from 'src/app/service-idb/idb-crud.service';
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
  constructor(public idb: IdbCrudService,public dialog: MatDialog, public sync:SyncControlService) { }

  ngOnInit(): void {
  }


  onEmail():void {
    this.idb.delete('login',1).subscribe(res => {
      this.login.email = this.email; 
      this.idb.put('login',this.login);
      this.sync.syncDataCloud(this.login);
    });
  }

}
