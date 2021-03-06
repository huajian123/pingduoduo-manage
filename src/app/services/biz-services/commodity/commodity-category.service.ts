import {Inject, Injectable} from '@angular/core';
import {BaseHttp} from "../../http/base-http";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../services.module";
import {NzMessageService} from "ng-zorro-antd";
import {Observable} from "rxjs";
import {PageInfo, SearchCommonVO} from "../../../VO/types";

export interface CommodityModel {
  id?: number;
  name: string;
  pid: number;
  coverUrl?: string;
  showState: number;
  level: number;
  leaf: number;
  sort: number;
  children?: CommodityModel[];
  expand?: boolean;
  showChildren?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommodityCategoryService extends BaseHttp {

  constructor(public http: HttpClient, @Inject(API_CONFIG) public uri: string, public message: NzMessageService) {
    super(http, uri, message);
  }

  public getCommdityCategoryList(params: { name: string, pid: number }): Observable<any[]> {
    return this.post('/commodity/queryCommodityCategory', params);
  }

  public addCommdityCategory(params: CommodityModel): Observable<any> {
    return this.post('/commodity/addCommodityCategory', params, {needSuccessInfo: true});
  }

  public updateCommdityCategory(params: CommodityModel): Observable<any> {
    return this.post('/commodity/updateCommodityCategory', params, {needSuccessInfo: true});
  }

  public delCommdityCategory(id: number): Observable<any> {
    return this.post('/commodity/delCommodityCategory', {id: id}, {needSuccessInfo: true});
  }

  public batchDelCommdityCategory(idArray: number[]): Observable<any> {
    return this.post('/commodity/batchDelCommdityCategory', {idArray: idArray}, {needSuccessInfo: true});
  }

  public getCommodityCategoryDetail(id: number): Observable<CommodityModel> {
    return this.post('/commodity/getCommodityCategoryDetail', {id: id});
  }

}
