import { Component, OnInit, Input } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { BarcodeFormat } from '@zxing/library';

import { AppService } from "../../service/app.service";

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

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  isEnabled = true;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.isEnabled = true;
    // this.runForm.addControl(this.builderService.detailArray[this.index].formControlName, new FormControl(''));
  }

  scan() {
    this.isEnabled = true;
  }

  stop() {
    this.isEnabled = false;
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
    this.runForm.patchValue({'BarCodeScanner0': this.qrResultString})
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }
  
}

