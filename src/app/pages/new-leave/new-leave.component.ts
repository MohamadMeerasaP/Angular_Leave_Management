import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { APIResponse, Employee, LeaveRequest, LeaveType } from '../../model/Master';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-leave',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe, DatePipe, CommonModule],
  templateUrl: './new-leave.component.html',
  styleUrl: './new-leave.component.css'
})
export class NewLeaveComponent implements OnInit {

  leaveForm : FormGroup = new FormGroup({})
  masterSrv = inject(MasterService);
  leaveTypeList = signal<LeaveType[]>([]);
  employee$ : Observable<Employee[]> = new Observable<Employee[]>;
  private messageService = inject(MessageService);
  requestList : LeaveRequest [] = [];


  initializeFrom(){
    this.leaveForm = new FormGroup({
      leaveId : new FormControl(0),
      employeeId : new FormControl(this.masterSrv.loggedUserData.employeeId),
      leaveTypeId : new FormControl(0),
      startDate : new FormControl(""),
      endDate : new FormControl(""),
      status : new FormControl("New"),
      reason : new FormControl(""),
      requestDate : new FormControl(new Date()),
    })
    if(this.masterSrv.loggedUserData.role == 'Employee') {
      this.leaveForm.controls['employeeId'].disable();
    }
  }

  ngOnInit(): void {
    this.initializeFrom();
    this.getLeaveTypes();
    this.employee$ = this.masterSrv.getAllEmployee();
    this.getLeaveData();
  }

  getLeaveData(){
    if(this.masterSrv.loggedUserData.role == 'Employee') {
      this.getData();
    } else {
      this.getAllData();
    }
  }

  getData() {
    this.masterSrv.getAllLeaveByEmpId(this.masterSrv.loggedUserData.employeeId).subscribe((res: APIResponse)=> {
      this.requestList = res.data;
    })
  }

  getAllData() {
    this.masterSrv.getAllLeaveRequest().subscribe((res: APIResponse)=> {
      this.requestList = res.data;
    })
  }

  getLeaveTypes(){
    this.masterSrv.getAllLeaveType().subscribe((res: APIResponse)=>{
      this.leaveTypeList.set(res.data);
    })
  }

  onSave(){
    const formValue = this.leaveForm.getRawValue();
    this.masterSrv.newLeaveRequest(formValue).subscribe((res: APIResponse)=> {
      if(res.result) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Leave Request Raised',
        });
        this.getLeaveData();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to Raise Request',
        });
      }
    })
  }

  changeStatus(id: number) {
    this.masterSrv.changeLeaveStatus(id, 'Approved').subscribe((res:APIResponse)=> {
      this.leaveTypeList.set(res.data);
      this.getLeaveData();
    })
  }

  rejectLeave(id: number) {
    this.masterSrv.changeLeaveStatus(id, 'Canceled').subscribe((res:APIResponse)=> {
      this.leaveTypeList.set(res.data);
      this.getLeaveData();
    })
  }

  cancelLeave(id: number) {
    this.masterSrv.cancelLeaveById(id).subscribe((res:APIResponse)=> {
      this.leaveTypeList.set(res.data);
      this.getLeaveData();
    })
  }

}
