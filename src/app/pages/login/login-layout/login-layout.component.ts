import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from "../../../services/biz-services/login/login.service";

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.less']
})
export class LoginLayoutComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dataService: LoginService) {
  }


  submitForm(): void {
   // this.router.navigateByUrl('hazard');
  /*  Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });*/
    const param = this.validateForm.getRawValue();
    this.dataService.login(param).subscribe((res) => {
      console.log(res);
    });
    // this.router.navigateByUrl('hazard');

  }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}
