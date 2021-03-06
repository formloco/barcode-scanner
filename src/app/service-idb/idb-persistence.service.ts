import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdbPersistenceService {

  private formLocoDB;

  async connect(): Promise<void> {
    this.formLocoDB = await openDB('formLocoDB', 1, {
      upgrade(db) {
        db.createObjectStore('data', { keyPath: 'id', autoIncrement: true }) // form data
     }
    });
  }

  read(storeName: string, key): Observable<any> {
    return from(this.formLocoDB.get(storeName, key));
  }

  readAll(storeName: string): Observable<any> {
    return from(this.formLocoDB.getAll(storeName));
  }

  add(storeName: string, item: any): Observable<any> {
    return from(this.formLocoDB.add(storeName, item));
  }
  
  // update, create for auto-increment store
  put(storeName: string, item: any): Observable<any> {
    return from(this.formLocoDB.put(storeName, item));
  }

  delete(storeName: string, key: any): Observable<any> {
    return from(this.formLocoDB.delete(storeName, key));
  }

  clear(storeName: string): Observable<any> {
    return from(this.formLocoDB.clear(storeName));
  }

}

