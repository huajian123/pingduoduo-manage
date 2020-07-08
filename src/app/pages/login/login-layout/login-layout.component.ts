import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProjectListService} from '../../../services/biz-services/project-list.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.less']
})
export class LoginLayoutComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    this.router.navigateByUrl('hazard');
/*    const param = this.validateForm.getRawValue();
    this.dataService.login(param).subscribe((res) => {
      console.log(res);
    });*/
    // this.router.navigateByUrl('hazard');
    // Object.keys(this.validateForm.controls).forEach(key => {
    //   this.validateForm.controls[key].markAsDirty();
    //   this.validateForm.controls[key].updateValueAndValidity();
    // });

  }

  constructor(private fb: FormBuilder, private router: Router, private dataService: ProjectListService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: ['true']
    });
  }

}
