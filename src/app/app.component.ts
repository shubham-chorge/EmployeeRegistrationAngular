import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from './service/my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  empform: FormGroup = new FormGroup({});
  formData = {
    employeeNo: '',
    employeeName: '',
    date_of_joining: '',
    department: '',
    salary: '',
  };

  departmentList = [
    { id: 1, code: 'AD', description: 'Administration' },
    { id: 2, code: 'IT', description: 'Information technology' },
    { id: 3, code: 'HD', description: 'Help Desk' },
    { id: 4, code: 'HR', description: 'Human Resource' },
    { id: 5, code: 'OP', description: 'Operation' },
  ];
  empName: any;
  empList =  [] ;

  constructor(private _fb: FormBuilder, private myService: MyServiceService) {}

 
  ngOnInit() {
    this.empform = this._fb.group({
      employeeNo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]{0,30}$'),
        ]),
      ],
      employeeName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      date_of_joining: ['', Validators.required],
      department: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(2)]),
      ],
      salary: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]{0,30}$'),
        ]),
      ],
    });
  }

  onSubmit() {
     this.empName = this.empform.value.employeeName
    this.myService.addEmp(this.empform.value).subscribe(res => {alert( this.empName  + " Successfully Added !!")} , err => alert("Something went Wrong !!")  )
    this.resetForm()
  }

  resetForm() {
    this.empform.reset();
  }

  getUpdatedList () {
    this.myService.listEmp().subscribe((res: any) => {
      this.empList = res
    })
  }
}
