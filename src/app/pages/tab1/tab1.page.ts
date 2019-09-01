import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';

import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  numPageTopHeadLine = 0;

  @ViewChild(IonInfiniteScroll, {static: true}) ionInfiniteScroll: IonInfiniteScroll;

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias( event? ) {

    this.numPageTopHeadLine++;

    this.noticiasService.getTopHeadLines( this.numPageTopHeadLine )
        .subscribe( resp => {

          setTimeout( () => {

            // console.log('noticias', resp);
            this.noticias.push( ...resp.articles );

            if ( event ) {
              event.target.complete();
              if (resp.articles.length === 0) {
                this.ionInfiniteScroll.disabled = true;
              }
              return;
            }

          }, 1000);

        });

  }

  loadData( event ) {

    // console.log(event);
    this.cargarNoticias( event );

  }

}
