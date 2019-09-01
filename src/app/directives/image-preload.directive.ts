import {Directive, Input, HostBinding} from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'img[default]',
    // tslint:disable-next-line: no-host-metadata-property
    host: {
      '(error)': 'updateUrl()',
      // '(load)': 'load()',
      '[src]': 'src'
     }
  })

 export class ImagePreloadDirective {

    // Atributos que se cargaran en la imagen
    @Input() src: string;
    @Input() default: string;
    // @HostBinding('class') className: string;

    updateUrl() {
      this.src = this.default;
      // this.className = 'image-default-loaded';
    }

    load() {
      // this.className = 'image-well-loaded';
    }
  }
