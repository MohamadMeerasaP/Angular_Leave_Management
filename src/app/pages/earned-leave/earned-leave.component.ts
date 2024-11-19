import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { APIResponse, Employee, EarnedLeave } from '../../model/Master';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-earned-leave',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,DatePipe],
  templateUrl: './earned-leave.component.html',
  styleUrl: './earned-leave.component.css'
})
export class EarnedLeaveComponent implements OnInit {

 form: FormGroup = new FormGroup({});
 masterSrv = inject(MasterService);
 private messageService = inject(MessageService);
 employee$ : Observable<Employee[]> = new Observable<Employee[]>
 earnedLeaves : EarnedLeave[] = [];

 constructor(){
  this.initializeForm();
  this.employee$ = this.masterSrv.getAllEmployee();
 }

  ngOnInit(): void {
    this.getEarnedLeave();
  }

 initializeForm(){
  this.form = new FormGroup({
    earnedLeaveId: new FormControl(0),
    employeeId: new FormControl(0),
    totalEarnedLeaves: new FormControl(0),
    lastUpdatedDate: new FormControl(new Date())
  })
 }

 getEarnedLeave(){
  this.masterSrv.getAllEarnedLeaves().subscribe((res: APIResponse)=> {
    this.earnedLeaves = res.data;
  })
 }


 onSave(){
  const formValue = this.form.value;
  this.masterSrv.addEarnedLeave(formValue).subscribe((res : APIResponse)=> {
    if(res.result) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Leaves Modified',
      });
      this.getEarnedLeave();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Unable to Add Leave',
      });
    }
  })
 }

}
