import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalVariable } from "../config/global";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { saveData, getData } from '../config/secureLS/secureLs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(submission: any): Observable<any> {
    return this.http.post(
      buildPOSTUrl(GlobalVariable.REGISTER),
      submission,{ }
    );
  }

}

function buildPOSTUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE;
  finalUrl += type;
  return finalUrl;
}