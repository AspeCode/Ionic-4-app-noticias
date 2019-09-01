import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  slidesOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor( public dataLocalService: DataLocalService ) {
    console.log('noticias', this.dataLocalService.noticias);
    console.log('pepe', this.dataLocalService.infoPerfil);

  }

}
