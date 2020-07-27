import { Country } from './../../models/Country';
import { CasesApiService } from './../cases-api/cases-api.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private country = new Subject<any>();

  constructor() { }

  sendCountry(country:Country){
    this.country.next(country);
  }

  getCountry():Observable<any>{
    return this.country.asObservable();
  }
}
