import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RespuestaTopHeadLines, Article } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string ) {

    query = apiUrl + query;
    return this.http.get<T>( query, { headers } );

  }

  getTopHeadLines( numPage: number ) {
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=dc661a2761174c13b295efeeffdf5dfc`);

    return this.ejecutarQuery<RespuestaTopHeadLines>( `/top-headlines?country=us&page=${ numPage }&pageSize=5` );

  }

  getTopHeadLinesCategoria( categoria: string, numPage: number ) {
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=dc661a2761174c13b295efeeffdf5dfc`);

    return this.ejecutarQuery<RespuestaTopHeadLines>( `/top-headlines?country=us&category=${ categoria }` +
                                                      (numPage !== null ? `&page=${ numPage }&pageSize=20` : ``)
                                                    );

  }

}
