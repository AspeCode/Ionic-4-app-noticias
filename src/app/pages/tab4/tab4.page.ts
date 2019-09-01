import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DataLocalService } from '../../services/data-local.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  @ViewChild('radarCanvas', { static: true }) radarCanvas;
  valueBarsChart: any;
  chartData = null;

  slidesOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  infoPerfilCategorias: string[] = [];
  infoPerfilPuntuacion: number[] = [];
  mostrarGrafico = false;

  loading: any;

  constructor( public dataLocalService: DataLocalService,
               public loadingCtrl: LoadingController ) {

  }

  ngOnInit() {

    this.presentLoading( 'Espere...' );
    let primer = 0;
    let segun = 1;
    let res;
    console.log(primer);
    console.log(segun);
    for (let i = 0; i < 20; i++) {

      res = primer + segun;
      console.log(res);
      primer = segun;
      segun = res;

    }

  }

  async presentLoading( message: string ) {

    this.loading = await this.loadingCtrl.create({
      message,
      duration: 800
    });

    this.loading.onWillDismiss()
      .then( a => {
        this.cargarGrafico();
    });

    await this.loading.present();

  }

  cargarGrafico() {

    console.log(this.dataLocalService.infoPerfil);

    if (this.dataLocalService.infoPerfil.length > 0) {
      this.mostrarGrafico = true;
    }

    this.dataLocalService.infoPerfil.forEach( val => {
      this.infoPerfilCategorias.push( val.categoria );
      this.infoPerfilPuntuacion.push( val.puntuacion );
    });

    this.valueBarsChart = new Chart(this.radarCanvas.nativeElement, {
      type: 'radar',
      data: {
        // labels: ['business', 'entertainment', 'health', 'science', 'sports', 'technology'],
        labels: this.infoPerfilCategorias,
        datasets: [
          {
            label: 'Temas más visitados',
            backgroundColor: 'rgb(255,224,230)',
            borderColor: 'rgb(255,100,131)',
            // data: [1, 5, 3, 0, 2, 7]
            data: this.infoPerfilPuntuacion
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false,
          position: 'top'
        },
        scale: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    });

  }

  actualizarGrafico() {

    if (this.dataLocalService.infoPerfil.length > 0) {
      this.mostrarGrafico = true;
    }

    this.infoPerfilCategorias = [];
    this.infoPerfilPuntuacion = [];
    this.dataLocalService.infoPerfil.forEach( val => {
      this.infoPerfilCategorias.push( val.categoria );
      this.infoPerfilPuntuacion.push( val.puntuacion );
    });
    this.valueBarsChart.data.datasets.forEach( dataset => {
      dataset.data = this.infoPerfilPuntuacion;
    });
    this.valueBarsChart.data.labels = this.infoPerfilCategorias;

    this.valueBarsChart.update();

  }

}
