import {Inject, Injectable} from '@angular/core';
import {BaseHttp} from '../../http/base-http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_CONFIG} from '../../services.module';
import {PageInfo} from '../../../VO/types';
import {NzMessageService} from 'ng-zorro-antd';
import {UserModel} from "../../../VO/user-model";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseHttp {

  constructor(public http: HttpClient, @Inject(API_CONFIG) public uri: string, public message: NzMessageService) {
    super(http, uri, message);
  }

  public login(params): Observable<UserModel> {
    return this.post('/user/login', params, {needSuccessInfo: true});
  }

}
