import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {SearchListBtnConfig} from "../../../VO/model";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-card-table-wrap',
  templateUrl: './card-table-wrap.component.html',
  styleUrls: ['./card-table-wrap.component.less']
})
export class CardTableWrapComponent implements OnInit {
  @Input() needAddBtnConfig: SearchListBtnConfig;
  @Output() add = new EventEmitter<any>();
  @Output() del = new EventEmitter<any>();


  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.needAddBtnConfig = {
      needAdd: false,
      needDel: false,
    }
  }


  addBtnClick() {
    this.add.emit();
  }

  fullScreen(elem: any = this.doc.documentElement) {
    if (!this.doc.fullscreenElement && !this.doc['webkitFullscreenElement']) {
      const docElm = elem;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (this.doc.exitFullscreen) {
        this.doc.exitFullscreen();
      }else if(this.doc['webkitCancelFullScreen']){
        this.doc['webkitCancelFullScreen']();
      }
    }
  }

  delBtnClick() {
    this.del.emit();
  }

  ngOnInit(): void {
  }

}
