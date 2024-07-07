import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  private sharedData: any

  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }
}
