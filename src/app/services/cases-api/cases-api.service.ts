import { Observable } from 'rxjs';
import { VirusCase } from './../../models/VirusCase';
import { Country } from './../../models/Country';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CasesApiService {
  apiURL: string="https://localhost:44373/covidMapApi/Cases";

  constructor(private httpClient:HttpClient) { }

  private getHeaderForToken(){
    var header = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return header;
  }
  
  public getAllCases()
  {
    return this.httpClient.get<Country[]>(this.apiURL);
  }
  public getGlobal()
  {
    return this.httpClient.get<VirusCase[]>(this.apiURL+"/global");
  }
  public getCaseByCountryId(id:string)
  {
    if(id)
    {
      return this.httpClient.get<VirusCase[]>(this.apiURL+"/"+id);
    }   
  }
  public createCase(virusCase:VirusCase)
  {
    if(virusCase)
    {
      return this.httpClient.post(this.apiURL,virusCase,{headers: this.getHeaderForToken() });
    }
  }
  public updateCase(virusCase:VirusCase)
  {
    if(virusCase)
    {
      return this.httpClient.put(this.apiURL,virusCase,{headers: this.getHeaderForToken() });
    }
  }

}
