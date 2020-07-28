import {Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef} from '@angular/core';
import {NzTableQueryParams} from 'ng-zorro-antd';

export interface TableHeader {
  title: string;                   // 表头名称
  field?: string;                   // 字段
  pipe?: string;                    // 管道
  width: number;                    // 单元格宽度
  thTemplate?: TemplateRef<any>;    // th单元格模板
  tdTemplate?: TemplateRef<any>;    // td单元格模板
  fixed?: boolean;                  // 是否固定单元格 （只有从最左边或最右边连续固定才有效）
  tdClassList?: string[];           // 为td单元格指定类 (父组件中的类必须加上 /deep/ 前缀才能对子组件生效)
  thClassList?: string[];           // 为th单元格指定类  (父组件中的类必须加上 /deep/ 前缀才能对子组件生效)
  show?: boolean;                   // 是否显示列，false:不显示，其他：显示
}

export interface MyTableConfig {
  showCheckbox?: boolean;
  pageIndex?: number;                 // 当前页码，（与页面中页码双向绑定）
  pageSize?: number;                // 每一页显示的数据条数（与页面中pageSize双向绑定）
  total?: number;                   // 数据总量，用于计算分页（应该从后端接口中获得）
  loading: boolean;                 // 是否显示表格加载中
  headers: TableHeader[];            // 列设置
}

@Component({
  selector: 'app-ant-table',
  templateUrl: './ant-table.component.html',
  styleUrls: ['./ant-table.component.less']
})
export class AntTableComponent implements OnInit {
  _dataList: any[];
  checkedDataArray: any[];

  @Input() checkedCashArray: any[];

  @Input()
  set tableData(value: any[]) {
    this._dataList = value
    if (this.tableConfig.showCheckbox) {
      this._dataList.forEach((item) => {
        item['_checked'] = false
      })
    }
  }

  get tableData(): any[] {
    return this._dataList;
  }

  @Input() tableConfig: MyTableConfig;
  @Output() changePageNum = new EventEmitter<NzTableQueryParams>();
  @Output() changePageSize = new EventEmitter<number>();
  @Output() selectedChange: EventEmitter<any[]>;
  indeterminate: boolean;
  checked: boolean;

  constructor() {
    this.indeterminate = true;
    this.checked = false;
    this.checkedDataArray = [];
    this.selectedChange = new EventEmitter<any[]>();
    this.checkedCashArray = [];
  }


  public trackByTableHead(index: number, item: any) {
    return item;
  }

  public trackByTableBody(index: number, item: any) {
    return item;
  }

  // 分页页码改变
  onQueryParamsChange(tableQueryParams: NzTableQueryParams) {
    this.changePageNum.emit(tableQueryParams);
  }

  // 修改一页几条的页码
  onPageSizeChange($event) {
    this.changePageSize.emit($event);
  }



  getCheckedDataArray(dataItem) {
    this.checkedDataArray.push(dataItem);
    this.checkedDataArray = this.checkedDataArray.filter((item) => item['_checked']);
    const hash = {};
    this.checkedDataArray = this.checkedDataArray.reduce((preVal, curVal) => {
      if (!hash[curVal.id]) {
        hash[curVal.id] = true && preVal.push(curVal);
      }
      return preVal;
    }, []);
  }

  public checkRowSingle(isChecked: boolean, selectIndex: number) {
    console.log(selectIndex);
    console.log(isChecked);
    console.log(this._dataList);
    this._dataList[selectIndex]['_checked'] = isChecked;
    this.getCheckedDataArray(this._dataList[selectIndex]);
    this.selectedChange.emit(this.checkedDataArray);
    console.log(this.checkedDataArray);
  }

  onAllChecked(isChecked: boolean): void {
    this._dataList.forEach(item => {
      item['_checked'] = isChecked;
      this.getCheckedDataArray(item);
    });
    this.selectedChange.emit(this.checkedDataArray);
    console.log(this.checkedDataArray);
  }

  ngOnInit(): void {
  }
}
