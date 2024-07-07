import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService { private storageSubject = new Subject<string>();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        this.storageSubject.next(event.key as any);
      }
    });
  }

  getStorageChanges(): Observable<string> {
    return this.storageSubject.asObservable();
  }

  setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.storageSubject.next(key);
  }

  getValue(key: string): string | null {
    return localStorage.getItem(key);
  }
}