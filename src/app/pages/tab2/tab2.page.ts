import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  noticiasCategoria: Article[] = [];
  categoriaChecked: string;
  numPageTopHeadLinesCategoria = 0;

  loading: any;

  ngOnInit() {

    this.segment.value = this.categorias[0];
    this.categoriaChecked = this.categorias[0];
    this.numPageTopHeadLinesCategoria++;

    this.presentLoading( 'Espere...' );

  }

  async presentLoading( message: string ) {

    this.loading = await this.loadingCtrl.create({
      message,
      duration: 800
    });

    this.loading.onWillDismiss()
      .then( a => {
        // console.log('dismissed');
        this.cargarNoticiasIniciales();
    });

    await this.loading.present();

  }

  cargarNoticiasIniciales() {

    this.noticiasService.getTopHeadLinesCategoria( this.segment.value, 0 )
      .subscribe( resp => {
        // console.log(resp);
        this.noticiasCategoria.push( ...resp.articles );
      });

  }

  constructor( private noticiasService: NoticiasService,
               public loadingCtrl: LoadingController ) {

  }

  cargarCategorias( evento? ) {

    if (evento.detail !== null) {
      if (this.categoriaChecked !== evento.detail.value) {
        this.categoriaChecked = evento.detail.value;
        this.numPageTopHeadLinesCategoria = 1;
        this.noticiasCategoria = [];
        this.presentLoading( 'Espere...' );
      }
    } else {
      this.numPageTopHeadLinesCategoria++;
    }


    this.noticiasService.getTopHeadLinesCategoria( (evento.detail !== null ? evento.detail.value : this.categoriaChecked),
                                                   this.numPageTopHeadLinesCategoria )
      .subscribe( resp => {

        setTimeout( () => {

          if (evento.detail === null) {
            evento.target.complete();
          }

          // console.log(resp);
          this.noticiasCategoria.push( ...resp.articles );
          return;

        }, 700);

      });

  }

}
