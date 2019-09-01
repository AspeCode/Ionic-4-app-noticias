import { Injectable } from '@angular/core';
import { Article, InfoPerfil } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  infoPerfil: InfoPerfil[] = [];

  constructor( private storage: Storage ) {
    this.cargarFavoritos();
    this.cargarInfoPerfil();
  }

  guardarNoticia( noticia: Article ) {

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if (!existe) {
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias);
    }

    return existe;

  }

  async cargarFavoritos() {

    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }

  }

  borrarNoticia( noticia: Article ) {

    // buscamos todas las noticias que no coincidan con la que le hemos pasado a borrar, y devolvemos esa colección para volverla a guardar
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );

    // volvemos a guardar en el storage
    this.storage.set('favoritos', this.noticias);

  }

  actualizarPerfil( categoria: string, puntuacion: number ) {

    // debugger;
    const existeInfo = this.infoPerfil.find( info => info.categoria === categoria );
    if (!existeInfo) {

      // this.infoPerfil.unshift( {categoria: categoria, puntuacion: puntuacion} );
      this.infoPerfil.push( {categoria, puntuacion} );
      this.storage.set('infoPerfil', this.infoPerfil);

    } else {
      existeInfo.puntuacion = existeInfo.puntuacion + puntuacion;
      this.storage.set('infoPerfil', this.infoPerfil);

    }

  }

  async cargarInfoPerfil() {

    const infoPerfil = await this.storage.get('infoPerfil');

    if (infoPerfil) {
      this.infoPerfil = infoPerfil;
    }

  }

}
