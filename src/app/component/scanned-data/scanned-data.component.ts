import { Component, Input, OnInit } from '@angular/core';

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
  
  displayedColumns: string[] = ['id', 'barcode'];
  constructor() { }

  ngOnInit(): void {
  }

}
