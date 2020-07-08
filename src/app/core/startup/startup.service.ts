import {Injectable} from '@angular/core';
import {PreloaderService} from '../../services/common-services/preloader.service';

@Injectable()
export class StartupService {
  constructor(private preloaderService: PreloaderService) {
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.preloaderService.removePreLoader();
      console.log('项目启动前初始化工作');
      return resolve();
    });
  }
}
