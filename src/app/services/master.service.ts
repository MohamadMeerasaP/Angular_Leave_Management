import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, EarnedLeave, Employee, LeaveRequest } from '../model/Master';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = "https://projectapi.gerasim.in/api/EmployeeManagement/";
  loggedUserData : any;

  constructor(private http : HttpClient) {
    const localData = localStorage.getItem("leaveUser");
    if(localData) {
      this.loggedUserData = JSON.parse(localData);
    }
   }


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

  addEarnedLeave(emp : EarnedLeave)  : Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}AddNewEarnedLeave`, emp)
  }

  getAllEarnedLeaves() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllEarnedLeaves")
  }

  getAllLeaveType() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetLeaveTypes")
  }

  newLeaveRequest(emp : LeaveRequest)  : Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}CreateNewLeaveRequest`, emp)
  }

  getAllLeaveByEmpId(id : number)  : Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}GetAllLeaveRequestByEmpId?id=`+ id)
  }

  getAllLeaveRequest()  : Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}GetAllLeaveRequest`)
  }

  changeLeaveStatus(leaveId : number, status : string) : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "ChangeLeaveStatus?leaveId="+leaveId+"&status="+status)
  }
}
