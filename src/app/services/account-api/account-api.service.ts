import { User } from './../../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  apiURL: string="https://localhost:44373/covidMapApi/Account";

  constructor(private httpClient: HttpClient) { }

  //post
  login(user:User)
  {
    return this.httpClient.post(this.apiURL,user)
  }

  logout()
  {
    return localStorage.removeItem('token');
  }
}
