import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { BarcodeFormat, MultiFormatReader } from '@zxing/library';

import { AppService } from "../../service/app.service";

import { IdbCrudService } from "../../service-idb/idb-crud.service";
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  @Input() index;
  @Input() runForm;

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;
  idbData;
  tableData;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  isEnabled = true;

  @ViewChild(ZXingScannerComponent) scanner: ZXingScannerComponent;
  constructor(public appService: AppService, public idb: IdbCrudService) { }

  ngOnInit(): void {
    this.isEnabled = true;
    // this.runForm.addControl(this.builderService.detailArray[this.index].formControlName, new FormControl(''));
  }

  scan() {
    this.isEnabled = true;
  }

  stop() {
    this.isEnabled = false;
    this.scanner.reset();

  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.isEnabled = false;
    //this.runForm.patchValue({'BarCodeScanner0': this.qrResultString})
    this.idb.put('data', { 'BarCodeScanner0': this.qrResultString })
    this.scanner.reset();
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onloggedIn(emittedValue) {
    if (emittedValue) {
      this.idb.readAll('data').subscribe(data => {
        this.idbData = data;
        if (this.idbData.length > 0) {
          this.tableData = this.idbData.map(d => {
            console.log(d);
            return {
              id: d['id'],
              barcode: d['BarCodeScanner0']
            }
          });
        }

      })
    }
  }

}

