import { Injectable } from '@angular/core'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = environment.apiUrl;
  fileUrl = environment.fileUrl;

  constructor(
    private _http: HttpClient) { }

    save(obj) {
      return this._http.post(this.apiUrl, obj);
    }

    saveFile(obj) {
      return this._http.post(this.fileUrl, obj);
    }

    getData(obj) {
      return this._http.get(this.apiUrl + obj.tenant_id + '/' + obj.form_id);
    }
  
    getFiles(tenant_id, form_id) {
      return this._http.get(this.fileUrl + tenant_id + '/' + form_id);
    }
}
