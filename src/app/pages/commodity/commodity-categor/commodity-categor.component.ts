import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService, NzUploadFile} from "ng-zorro-antd";

import {
  CommodityCategoryService,
  CommodityModel
} from "../../../services/biz-services/commodity/commodity-category.service";
import {SearchListBtnConfig} from "../../../VO/model";

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-commodity-categor',
  templateUrl: './commodity-categor.component.html',
  styleUrls: ['./commodity-categor.component.less']
})
export class CommodityCategoryComponent implements OnInit {
  needAddBtnConfig: SearchListBtnConfig;
  dataList: CommodityModel[];
  filters: { name: string };

  htmlModalVisible: boolean;
  addEditForm: FormGroup;


  fileList: NzUploadFile[] = [
  ];


  previewImage: string | undefined = '';
  previewVisible = false;
  constructor(private fb: FormBuilder, private dataService: CommodityCategoryService, private modal: NzModalService, private message: NzMessageService) {
    this.dataList = [];
    this.needAddBtnConfig = {
      needAdd: true,
      needDel: true,
    };
    this.filters = {name: ''};

    this.htmlModalVisible = false;
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  /*新增*/
  add(): void {
    this.addEditForm.reset();
    this.htmlModalVisible = true;
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

  initForm() {
    this.addEditForm = this.fb.group({
      name: [null, [Validators.required]],
    });
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
    console.log(param);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataList(0, this.dataList)
  }
}
