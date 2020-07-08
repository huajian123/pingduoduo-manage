import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
preloaderFinished();
export function preloaderFinished() {
  const body = document.querySelector('body');
  const preloader = document.querySelector('.preloader');

  // body.style.overflow = 'hidden';

  function remove() {
    // preloader value null when running --hmr
    if (!preloader) { return; }
    preloader.addEventListener('transitionend', () => {
      preloader.className = 'preloader-hidden';
    });

    preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
  }

  (window as any).appBootstrap = () => {
    setTimeout(() => {
      remove();
      body.style.overflow = '';
    }, 100);
  };
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
