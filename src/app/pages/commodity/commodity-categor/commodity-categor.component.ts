import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MyTableConfig} from "../../../share/commponent/ant-table/ant-table.component";
import {ProjectListService, ProjectModel} from "../../../services/biz-services/project-list.service";
import {NzTableQueryParams} from "ng-zorro-antd";
import {SearchCommonVO} from "../../../VO/types";
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

  validateForm: FormGroup;
  tableConfig: MyTableConfig;
  isCollapse: boolean;
  @ViewChild('operationTpl', {static: true}) operationTpl: TemplateRef<any>;
  dataList: CommodityModel[];


  constructor(private fb: FormBuilder, private dataService: CommodityCategoryService) {
    this.isCollapse = true;
    this.dataList = [];
  }


  check(name) {
    console.log(name);
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: '种类名称',
          width: 100,
          field: 'name',
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 150,
          fixed: true
        }
      ],
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
    };
  }

  /*展开*/
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  /*新增*/
  addRow(): void {
  }

  /*重置*/
  resetForm(): void {
    this.validateForm.reset();
  }

  initForm() {
    this.validateForm = this.fb.group({
      ruleName: [null],
      desc: [null],
    });
  }

  // 修改一页几条
  changePageSize(e) {
    this.tableConfig.pageSize = e;
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex
    };
    this.dataList = [];
    this.dataService.getCommdityCategoryList(params).subscribe((data) => {
      const {list, total, pageNum} = data;
      this.dataList = list;
      this.tableConfig.total = total;
      this.tableConfig.pageIndex = pageNum;
      this.tableConfig.loading = false;
    }, () => {
      this.tableConfig.loading = false;
    });
  }

  add() {
    console.log(123);
  }

  ngOnInit(): void {
    this.initForm();
    this.initTable();
    this.tableConfig.loading = true;
  }
}
