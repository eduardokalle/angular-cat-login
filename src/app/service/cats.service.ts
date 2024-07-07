import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalVariable } from "../config/global";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { saveData, getData } from '../config/secureLS/secureLs';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(private http: HttpClient) { }

  listCats(data: any): Observable<any> {
    return this.http.get(
      buildPOSTUrl(GlobalVariable.LISTCATS),
    );
  }

  getImagenforbreed(breedId: any): Observable<any> {
    return this.http.get(
      buildPOSTUrl(`${GlobalVariable.IMAGEBREED}`+`${breedId.data}`),
    );
  }

  getCatBreedsid(breedId: any): Observable<any> {
    console.log(breedId);
    
    return this.http.get(
      buildPOSTUrl(`${GlobalVariable.LISTCATSID}`+`${breedId.data}`),
    );
  }

  getCatBreedsSearch(data: any): Observable<any> {
    return this.http.get(
      buildPOSTUrl(GlobalVariable.IMAGEBREED),
    );
  }

}

function buildPOSTUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE;
  finalUrl += type;
  return finalUrl;
}
