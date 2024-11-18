import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    "userName": "",
    "password": ""
  }
  private messageService = inject(MessageService);


  http = inject(HttpClient);
  router = inject(Router);


  onLogin(){
    this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login",this.loginObj).subscribe((res:any)=> {
      if(res.result){
        localStorage.setItem("leaveUser",JSON.stringify(res.data));
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login Successfully',
        });
        this.router.navigateByUrl("dashboard")
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User Not Found',
        });
      }
    })
  }
}
