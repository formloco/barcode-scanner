import { Injectable } from '@angular/core';
import { IdbCrudService } from '../service-idb/idb-crud.service';
import {SyncService} from '../service/sync.service';

@Injectable({
  providedIn: 'root'
})
export class SyncControlService {
  idbData

  constructor(private idbCrudService: IdbCrudService,private syncService: SyncService) { }
  

  syncDataCloud(user) {
    this.idbData = [];
    this.idbCrudService.readAll('data').subscribe(data => {
      this.idbData = data;

      if (this.idbData.length > 0) {
        this.idbData.forEach((element, index) => {
          if (element["user_created"] === undefined)
            element["user_created"] = {
              email: user.email,
              date_created: new Date(),
            }
          element["tenant_id"] = user.tenant_id;
        });

        this.syncService.syncDataCloud(this.idbData).subscribe(res => {
          let response = res;
          console.log(res);
          if (response["message"] === 'Data synchronized.') {
            this.idbCrudService.clear('data').subscribe();
          }
        });
      }
    });
  }

}
