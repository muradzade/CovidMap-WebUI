import { AccountApiService } from './../../../services/account-api/account-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,
              private accountApi:AccountApiService) { }

  ngOnInit(): void {
    
  }
  buttonControl(): boolean {
    if(localStorage.getItem('token')!=null)
      return true;
    else
      return false;
  }
  login()
  {
    this.router.navigateByUrl("/login");   
  }
  logout()
  { 
    this.accountApi.logout();
    this.router.navigateByUrl("/");
  }
}
