import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-earned-leave',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './earned-leave.component.html',
  styleUrl: './earned-leave.component.css'
})
export class EarnedLeaveComponent {

 form: FormGroup = new FormGroup({});

 initializeForm(){
  this.form = new FormGroup({
    earnedLeaveId: new FormControl(0),
    employeeId: new FormControl(0),
    totalEarnedLeaves: new FormControl(0),
    lastUpdatedDate: new FormControl(new Date())
  })
 }

}
