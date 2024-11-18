import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Employee } from '../model/Master';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = "https://projectapi.gerasim.in/api/EmployeeManagement/";

  constructor(private http : HttpClient) { }

  getDepartment() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetParentDepartment")
  }

  getChildDeptByParentId(id : string) : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetChildDepartmentByParentId?deptId=" +id)
  }

  createNewEmployee(obj : Employee)  : Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}CreateEmployee`, obj)
  }

  updateEmployee(obj : Employee)  : Observable<Employee> {
    return this.http.put<Employee>(this.apiUrl + "UpdateEmployee/"+obj.employeeId,obj)
  }

  getAllEmployee() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees")
  }

  getAllChildDept() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllChildDepartment")
  }

  deleteEmp(id : number) : Observable<Employee[]>{
    return this.http.delete<Employee[]>(this.apiUrl + "DeleteEmployee/" +id)
  }
}
