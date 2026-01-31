import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImagenesService } from 'src/app/services/imagenes.service';
// import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts'
import { Chart, registerables } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { IonFabButton,IonCardTitle,IonCardContent,IonHeader,IonCard,IonFab,IonCol, IonSpinner, IonButton,IonContent,IonList,IonItem, IonRow,IonIcon,IonToolbar,IonTitle } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomLoader } from 'src/app/services/custom-loader.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
 imports:[IonContent,IonCard,IonRow,IonIcon,
    IonCol,
    IonSpinner, IonCardContent,
    IonFab, RouterLink, IonCardTitle,
    IonFabButton,CommonModule]
})
export class GraficosPage implements OnInit {

  @ViewChild('pieCanvas') pieCanvas!: ElementRef;
  @ViewChild('barCanvas') barCanvas!: ElementRef;

  imagenesService = inject(ImagenesService);
  private customLoader = inject(CustomLoader);

  
  spinnerMostrandose = false;
  //this.customLoader.show('Cargando gráficos...');


  pieChart!: Chart;
  barChart!: Chart;

  async ngOnInit() {


    this.customLoader.show('Cargando gráficos...');
  

    Chart.register(...registerables);
    await this.cargarGraficos();

    this.customLoader.hide();
  }

  async cargarGraficos() {
    const fotosLindas = await this.imagenesService.obtenerFotos('cosas-lindas');
    const fotosFeas = await this.imagenesService.obtenerFotos('cosas-feas');

    const datosLindas = this.agruparPorAutor(fotosLindas);
    const datosFeas = this.agruparPorAutor(fotosFeas);

    this.crearGraficoTorta(
      Object.keys(datosLindas),
      Object.values(datosLindas)
    );

    this.crearGraficoBarras(
      Object.keys(datosFeas),
      Object.values(datosFeas)
    );
  }

  agruparPorAutor(fotos: any[]): Record<string, number> {
    return fotos.reduce((acc, foto) => {
      acc[foto.autor] = (acc[foto.autor] || 0) + foto.interacciones;
      return acc;
    }, {});
  }

  crearGraficoTorta(labels: string[], data: number[]) {
    if (this.pieChart) this.pieChart.destroy();

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: ['#ff9800', '#bdbdbd', '#757575', '#424242']
        }]
      },
      options: { responsive: true }
    });
  }

  crearGraficoBarras(labels: string[], data: number[]) {
    if (this.barChart) this.barChart.destroy();

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Interacciones',
          data,
          backgroundColor: '#ff9800'
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
