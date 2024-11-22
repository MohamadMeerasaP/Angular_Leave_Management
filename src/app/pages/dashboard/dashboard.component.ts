import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  hrDashboardData : any;
  empDashboardData : any;
  masterSrv = inject(MasterService);

  ngOnInit(): void {
    if(this.masterSrv.loggedUserData.role == 'Admin') {
      this.getHrData();
    } else {
      this.getEmpData();
    }
  }

  getHrData(){
    this.masterSrv.getHrValues().subscribe((res: any)=> {
      this.hrDashboardData = res;
    })
  }

  getEmpData(){
    this.masterSrv.getEmpValues(this.masterSrv.loggedUserData.employeeId).subscribe((res: any)=> {
      this.empDashboardData = res;
    })
  }

}
