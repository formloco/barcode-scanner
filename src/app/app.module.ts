import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfig} from './interceptor/httpconfig.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppComponent } from './app.component';

import { PinComponent } from './component/pin/pin.component';
import { AdminComponent } from './component/admin/admin.component';
import { BarcodeComponent } from './component/barcode/barcode.component';

import { MaterialModule } from "./material.module";

import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IdbPersistenceService } from './service-idb/idb-persistence.service';
import { AdminDialogComponent } from './component/adminodialog/admin-dialog.component';
import { ScannedDataComponent } from './component/scanned-data/scanned-data.component';
import { MatTableExporterModule } from 'mat-table-exporter';



@NgModule({
  declarations: [
    AppComponent,
    PinComponent,
    AdminComponent,
    AdminDialogComponent,
    BarcodeComponent,
    ScannedDataComponent
  ],
  entryComponents:[AdminDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ZXingScannerModule,
    MatTableExporterModule
  ],
  exports:[
    PinComponent,
    AdminComponent,
    AdminDialogComponent,
    BarcodeComponent,
  ],
  providers: [
    AuthService, 
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfig,
      multi: true
    },
    { provide: APP_INITIALIZER,
      useFactory: (idbPersistenceService: IdbPersistenceService) => () => idbPersistenceService.connect(),
      deps: [IdbPersistenceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
