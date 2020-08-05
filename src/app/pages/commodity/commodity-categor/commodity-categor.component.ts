import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyTableConfig} from "../../../share/commponent/ant-table/ant-table.component";
import {NzMessageService, NzModalService, NzTableQueryParams} from "ng-zorro-antd";
import {SearchCommonVO} from "../../../VO/types";
import {
  CommodityCategoryService,
  CommodityModel
} from "../../../services/biz-services/commodity/commodity-category.service";
import {SearchListBtnConfig} from "../../../VO/model";

@Component({
  selector: 'app-commodity-categor',
  templateUrl: './commodity-categor.component.html',
  styleUrls: ['./commodity-categor.component.less']
})
export class CommodityCategoryComponent implements OnInit {

  dataList: CommodityModel[];

  constructor(private fb: FormBuilder, private dataService: CommodityCategoryService, private modal: NzModalService, private message: NzMessageService) {
    this.dataList = [];
  }

  /*新增*/
  addRow(): void {
  }

  findChild(pid,e) {
    console.log(this.dataList);
    console.log(pid);
    const selData = this.dataList.find(({id}) => id === pid);
    console.log(selData);
    this.getDataList(pid, selData.children);
  }

  getDataList(pid = 0, childrenArray: CommodityModel[]) {
    let params: { name: string, pid: number } = {
      name: "",
      pid: pid
    };
    this.dataService.getCommdityCategoryList(params).subscribe((data) => {
      data.forEach(item => {
        item.children = [];
        item.expand = false;
        const index = childrenArray.findIndex(({id}) => {
          return id === item.id
        });
        if (index !== -1) return;
        childrenArray.push(item)
      })
    }, () => {

    });
  }


  ngOnInit(): void {
    this.getDataList(0, this.dataList)
  }
}
