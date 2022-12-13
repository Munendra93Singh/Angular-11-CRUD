import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { userModel } from '../model/user.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  public loginObj = new userModel();
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private route: Router,
    private api: ApiService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

   login() {
  // this.http.get<any>("http://localhost:3000/signupUsers")
  // .subscribe(res=>{
  //  const user = res.find((a:any)=>{
  //  return a.email   === this.loginForm.value.email && a.password === this.loginForm.value.password 
  //  });
  //  if(user){
  //   alert("Login Success");
  //   this.loginForm.reset();
  //   this.route.navigate(['dashboard'])
  //  }
  //  alert("user not found");
  // },err=>{
  //    alert("Something went wrong")
  // })
  this.loginObj.Username = this.loginForm.value.email;
  this.loginObj.Password = this.loginForm.value.password;
  this.api.login(this.loginObj).subscribe(res=>{
    alert(res.message);
    this.route.navigate(['dashboard'])
  })
  }
}
