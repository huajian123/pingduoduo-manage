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
  needAddBtnConfig: SearchListBtnConfig;
  addEditForm: FormGroup;
  tableConfig: MyTableConfig;
  isCollapse: boolean;
  @ViewChild('operationTpl', {static: true}) operationTpl: TemplateRef<any>;
  dataList: CommodityModel[];
  htmlModalVisible: boolean;
  itemId: number;
  // 缓存已经选中的checkbox每一项
  checkedCashArray: any[];
  filters: { name: string };

  constructor(private fb: FormBuilder, private dataService: CommodityCategoryService, private modal: NzModalService, private message: NzMessageService) {
    this.isCollapse = true;
    this.dataList = [];
    this.htmlModalVisible = false;
    this.itemId = null;
    this.checkedCashArray = [];
    this.needAddBtnConfig = {
      needAdd: true,
      needDel: true,
    };
    this.filters = {name: ''};
  }


  selectedChecked(e) {
    this.checkedCashArray = [...e];
  }

  update(id) {
    this.itemId = id;
    this.dataService.getCommodityCategoryDetail(id).subscribe((res) => {
      this.addEditForm.get("name").setValue(res.name);
    })
    this.htmlModalVisible = true;
  }


  del(id) {
    this.modal.confirm({
      nzTitle: '确定删除吗？',
      nzOnOk: () => {
        this.dataService.delCommdityCategory(id).subscribe(() => this.getDataList())
      },
      nzOkText: '确定',
      nzOnCancel: () => {
        return;
      },
      nzCancelText: '取消',
    });
  }

  batchDel() {
    if (this.checkedCashArray.length < 1) {
      this.message.error("请先勾选数据");
      return;
    }
    this.modal.confirm({
      nzTitle: '确定删除吗？',
      nzOnOk: () => {
        let ids = [];
        this.checkedCashArray.forEach(({id}) => {
          ids.push(id);
        })
        this.dataService.batchDelCommdityCategory(ids).subscribe(() => this.getDataList())
      },
      nzOkText: '确定',
      nzOnCancel: () => {
        return;
      },
      nzCancelText: '取消',
    });
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
          width: 30,
          fixed: true
        }
      ],
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
      showCheckbox: true,
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
    this.filters = {name: ""};
    this.getDataList();
  }

  initForm() {
    this.addEditForm = this.fb.group({
      name: [null, [Validators.required]],
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
      pageNum: e?.pageIndex || this.tableConfig.pageIndex,
      filters: this.filters,
    };
    this.dataList = [];
    this.dataService.getCommdityCategoryList(params).subscribe((data) => {
      const {list, total, pageNum} = data;
      this.dataList = list;
      this.tableConfig.total = total;
      this.tableConfig.pageIndex = pageNum;
      this.tableConfig.loading = false;
      this.checkedCashArray = [...this.checkedCashArray];

    }, () => {
      this.tableConfig.loading = false;
    });
  }

  add() {
    this.itemId = null;
    this.addEditForm.reset();
    this.htmlModalVisible = true;
  }

  handleOk() {
    Object.keys(this.addEditForm.controls).forEach(key => {
      this.addEditForm.controls[key].markAsDirty();
      this.addEditForm.controls[key].updateValueAndValidity();
    });
    if (this.addEditForm.invalid) {
      return;
    }
    const param = this.addEditForm.getRawValue();

    let submitHandel = null;
    if (!this.itemId) {
      submitHandel = this.dataService.addCommdityCategory(param)
    } else {
      param.id = this.itemId;
      submitHandel = this.dataService.updateCommdityCategory(param)
    }
    submitHandel.subscribe(() => {
      this.getDataList()
      this.htmlModalVisible = false;
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.initTable();
    this.tableConfig.loading = true;
  }
}
