import { AccountApiService } from './../../services/account-api/account-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userModel = new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });
  constructor(private accountApi:AccountApiService,
              private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token'))
      this.router.navigateByUrl('/admin');
  }

  login()
  {
    if(this.userModel.valid==true)
    {
     this.accountApi.login(this.userModel.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/admin');
      },err=>{
        if(err.status==400){
          alert("Kullanici adi ve ya sifre hatali");
        }
      });     
    }

  }
}
