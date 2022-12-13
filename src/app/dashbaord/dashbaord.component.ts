import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
 import { EmployeeModel } from './employee-dash board model';
import { ApiService } from '../shared/api.service';


// export class EmployeeModel{
//   id: number =0;
//   firstname:string='';
//   lastname:string = '';
//   email:string = '';
//   mobile:string = '';
//   salary:string = ''
// }

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent implements OnInit{

  formValue!:FormGroup;
  employeeModelObj :EmployeeModel = new EmployeeModel()
  employeeData !:any;
  showAdd!:boolean;
  showupdate!:boolean;

  constructor(private fb:FormBuilder ,
     private route :Router,
     private http: HttpClient,
     private api:ApiService
     ){}

  ngOnInit(): void {
    this.formValue= this.fb.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      mobile:[''],
      salary:['']
    }),
    this.getAllEmployeeeDetails();
  }
clickAddEmployee(){
  this.formValue.reset();
  this.showAdd = true;
  this.showupdate = false;
}

  postEmployeeDetails(){
    this.employeeModelObj.FirstName = this.formValue.value.firstname;
    this.employeeModelObj.LastName = this.formValue.value.lastname;
    this.employeeModelObj.Email = this.formValue.value.email;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Salary = this.formValue.value.salary;
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployeeeDetails();
    },
    err=>{
      alert("somrthing Error")
    })
  }

  getAllEmployeeeDetails(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res.employeeDetails
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Delete")
      this.getAllEmployeeeDetails();
    })
  }

  
  updateEmployeeDetails(){
    this.employeeModelObj.FirstName = this.formValue.value.firstname;
    this.employeeModelObj.LastName = this.formValue.value.lastname;
    this.employeeModelObj.Email = this.formValue.value.email;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Salary = this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployeeeDetails();
    })

  }
  Onedite(row:any){
    this.showAdd = false;
    this.showupdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
}

