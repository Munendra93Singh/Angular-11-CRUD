import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { userModel } from '../model/user.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  public signupForm !: FormGroup;
  public signupObj = new userModel();


  constructor(private formBuilder: FormBuilder,
     private http: HttpClient, 
     private route: Router,
     private api : ApiService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ["",Validators.required],
      mobile: ["",Validators.required],
      password: ["",Validators.required],
      username:["",Validators.compose([Validators.required,Validators.email])],
      usertype:["",Validators.required]
    })
  }

  signUp() {
this.signupObj.FullName = this.signupForm.value.fullname;
this.signupObj.Username = this.signupForm.value.username;
this.signupObj.Password = this.signupForm.value.password;
this.signupObj.UserType = this.signupForm.value.usertype;
this.signupObj.Mobile = this.signupForm.value.mobile;
    this.api.signUp(this.signupForm.value)
    .subscribe(res=>{
      alert(res.message);
      this.signupForm.reset();
      this.route.navigate(['login']);
    })
  }
}
