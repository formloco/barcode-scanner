import { Component, OnChanges, Input, HostBinding } from '@angular/core';

import { OverlayContainer } from '@angular/cdk/overlay'
import { Router } from '@angular/router';

import { AppService } from "../../service/app.service";
import { IdbCrudService } from "../../service-idb/idb-crud.service"

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnChanges {

  @Input() isDarkMode

  @HostBinding('class') className = 'darkMode'

  myInnerHeight = window.innerHeight;

  isPin = false;
  isSignin = false
  canvasBackground = '#3b3b3b'

  token;

  isRightMenu = false;
  isLookuplist = false;

  constructor(
    private router: Router,
    public appService: AppService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) {
      this.appService.canvasBackground = '#3b3b3b'
  }
  
  ngOnChanges(): void {
    if (this.appService.isDarkMode) this.appService.canvasBackground = '#3b3b3b'
    else this.appService.canvasBackground = '#ffffff'
  }

  toggleTheme() {

    let darkClassName = ''

    if (this.appService.isDarkMode) darkClassName = ''
    else darkClassName = 'darkMode'

    this.setMode(darkClassName)

    let obj = { id: 0, dark_mode: !this.appService.isDarkMode }
    this.idbCrudService.put('prefs', obj)

  }

  setMode(darkClassName) {
    this.className = 'darkMode' ? darkClassName : ''

    if (darkClassName === 'darkMode')
      this.overlayContainer.getContainerElement().classList.add(darkClassName)
    else
      this.overlayContainer.getContainerElement().classList.remove('darkMode')
  }

  goPIN() {
    this.appService.isPin = true;
    // this.router.navigate(['pin']);
  }

  openLists() {
    this.isLookuplist = true;
    this.isRightMenu = !this.isRightMenu;
  }

}
