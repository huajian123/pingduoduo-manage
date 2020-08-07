import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

import {
  CommodityCategoryService,
  CommodityModel
} from "../../../services/biz-services/commodity/commodity-category.service";

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

  del(id){
    console.log(id);
  }

  update(id){
    console.log(id);

  }
  findChild(dataItem, e) {
    dataItem.showChildren = e;
    if (dataItem.level === 1 && !e) {
      dataItem.children.forEach(item => {
        item.showChildren = false;
        item.expand = false;
      })
    }
    if (!e) return;
    this.getDataList(dataItem.id, dataItem.children);
  }

  myTrack(index, item) {
    return item.id;
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
        item.showChildren = false;

        const index = childrenArray.findIndex(({id}) => {
          return id === item.id
        });
        if (index !== -1) return;
        childrenArray.push(item)
      })
      this.dataList = [...this.dataList];
    }, () => {

    });
  }


  ngOnInit(): void {
    this.getDataList(0, this.dataList)
  }
}
