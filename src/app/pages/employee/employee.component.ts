import { Component, inject, OnInit } from '@angular/core';
import { APIResponse, ChildDept, Employee, ParentDept } from '../../model/Master';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeObj : Employee = new Employee();
  parentDeptId : string = '';
  masterSrv = inject(MasterService);
  parentDeptList : ParentDept [] = [];
  childDeptList : ChildDept [] = [];
  private messageService = inject(MessageService);
  employeeList: Employee[] = [];

  ngOnInit(): void {
    this.getAllEmployee();
    this.loadParentDept();
  }

  loadParentDept(){
    this.masterSrv.getDepartment().subscribe((res: APIResponse)=> {
      this.parentDeptList = res.data;
    })
  }

  loadChildDept(){
    this.masterSrv.getAllChildDept().subscribe((res: APIResponse)=> {
      this.childDeptList = res.data;
    })
  }

  getAllEmployee(){
    this.masterSrv.getAllEmployee().subscribe((res: Employee[])=> {
      this.employeeList = res;
    })
  }

  onDeptChange(){
    this.masterSrv.getChildDeptByParentId(this.parentDeptId).subscribe((res:APIResponse)=> {
      this.childDeptList = res.data;
    })
  }

  onSaveEmp(){
    this.masterSrv.createNewEmployee(this.employeeObj).subscribe((res: Employee)=> {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Created Successfully',
        });
        this.employeeObj = new Employee();
        this.getAllEmployee();
     
    })
  }

  onUpdateEmp(){
    this.masterSrv.updateEmployee(this.employeeObj).subscribe((res: Employee)=> {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Updated Successfully',
        });
        this.employeeObj = new Employee();
        this.getAllEmployee();
     
    })
  }

  onEdit(item : Employee) {
    this.employeeObj = item;
    this.loadChildDept()
  }

  onDelete(id : number){
    const isDelete = confirm("Are u sure Want to Delete this Employee");
    if (isDelete){
      this.masterSrv.deleteEmp(id).subscribe((res : Employee[])=> {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Deleted Successfully',
        });
        this.getAllEmployee();
      })
    }
  }

}
