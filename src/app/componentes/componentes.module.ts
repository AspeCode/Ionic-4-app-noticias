import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { IonicModule } from '@ionic/angular';
import { ImagePreloadDirective } from '../directives/image-preload.directive';



@NgModule({
  declarations: [
    NoticiasComponent,
    NoticiaComponent,
    ImagePreloadDirective
  ],
  exports: [
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentesModule { }
