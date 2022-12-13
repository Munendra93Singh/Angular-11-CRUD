import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // public loginAPIUrl:string ="https://localhost:7132/api/Login/"
   //publice signupAPIUrl:string = "https://localhost:7132/api/Employee/get-all_employeee"
  constructor(private http:HttpClient) { }

  postEmployee(data: any){
    return this.http.post<any>("http://localhost:3000/posts", data)
   .pipe(map((res:any)=>{
    return res;
   }))
  }
  getEmployee(){
    // return this.http.get<any>("http://localhost:3000/posts")
    return this.http.get<any>("https://localhost:7132/api/Employee/get-all_employeee")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployee(data:any,id:number){
    return this.http.put<any>("https://localhost:7132/api/Employee/update_employee"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEmployee(id:number){
    return this.http.delete<any>("https://localhost:7132/api/Employee/delete_employee"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  signUp(empObj: any){
    // return this.http.post<any>(this.loginUrlUrl+"signup",empObj)
    // return this.http.post<any>('${this.loginApiUrl}signup',empObj)
    return this.http.post<any>('https://localhost:7132/api/Login/signup', empObj);
  }
  login(empObj:any){
    return this.http.post<any>('https://localhost:7132/api/Login/login',empObj)
  }
}
