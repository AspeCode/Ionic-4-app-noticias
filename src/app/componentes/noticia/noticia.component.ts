import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { NoticiasService } from '../../services/noticias.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indiceNoticia: number;
  @Input() enFavoritos;
  categorias = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

  constructor( private iab: InAppBrowser,
               private actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing,
               private dataLocalService: DataLocalService,
               private noticiasService: NoticiasService,
               private toastCtrl: ToastController) { }

  ngOnInit() {}

  abrirNoticia() {

    const browser = this.iab.create(this.noticia.url, '_system');

    this.buscarCategoriaNoticia();

  }

  buscarCategoriaNoticia() {

    // buscamos la categoría de la noticia
    this.categorias.forEach( categoria => {

      this.noticiasService.getTopHeadLinesCategoria(categoria, null).subscribe( resp => {

        resp.articles.filter( noti => {
          if (noti.title === this.noticia.title) {

              this.dataLocalService.actualizarPerfil(categoria, 1);

          }
        });

      });

    });

  }

  async mostraAccionesNoticia() {

    let guardarBorrarFavBtn;

    // diferenciamos el botón de agregar o borrar de favoritos en función de nuestra localización
    if (this.enFavoritos) {

      guardarBorrarFavBtn = {
        text: 'Borrar favorito',
        cssClass: 'action-dark',
        icon: 'trash',
        handler: () => {

          this.dataLocalService.borrarNoticia( this.noticia );
          this.mostrarToast('Noticia borrada de favoritos');

        }
      };

    } else {

      guardarBorrarFavBtn = {
        text: 'Favorito',
        cssClass: 'action-dark',
        icon: 'star',
        handler: () => {

          // guardamos la noticia en el storage
          const existe = this.dataLocalService.guardarNoticia( this.noticia );

          // comprobamos si ya existia esa noticia en favoritos
          if (!existe) {
            this.mostrarToast('Noticia agregada a favoritos');
          } else {
            this.mostrarToast('Noticia ya en favoritos');
          }

        }
      };

    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
      {
        text: 'Compartir',
        cssClass: 'action-dark',
        icon: 'share',
        handler: () => {

          this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);

        }
      },
      guardarBorrarFavBtn
      , {
        text: 'Cancelar',
        cssClass: 'action-dark',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  async mostrarToast( mensaje: string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      mode: 'ios',
      closeButtonText: 'Cerrar',
      showCloseButton: true,
      duration: 2000
    });
    toast.present();
  }

}
