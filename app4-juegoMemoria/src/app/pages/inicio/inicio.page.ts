import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PuntajesService } from 'src/app/services/puntajes.service';
import { IonGrid,IonContent, IonToolbar,IonTitle,IonSegmentButton,AlertController,IonRow,IonButton,IonFooter} from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
//import ionChange
import { Howl } from 'howler';

interface Card {
  image: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports:[CommonModule,IonContent,FormsModule, IonToolbar,IonTitle,FormsModule, IonSegmentButton,IonGrid,IonRow,IonButton,IonFooter]

})
export class InicioPage implements OnInit {

 puntajeService = inject(PuntajesService);
  router = inject(Router);
  authService = inject(AuthService);

difficulty: 'facil' | 'medio' | 'dificil' = 'facil';  timer: number = 0;
  cards: any[] = [];
  flippedCards: number[] = [];
  matchedPairs: number = 0;
  gameStarted: boolean = false;
  gameFinished: boolean = false;
  interval: any;

  // Imágenes
  animalImages: string[] = ['../../../assets/imgs/animal1.png', '../../../assets/imgs/animal2.png', '../../../assets/imgs/animal3.png'];
  toolImages: string[] = ['../../../assets/imgs/tool1.png', '../../../assets/imgs/tool2.png', '../../../assets/imgs/tool3.png', '../../../assets/imgs/tool4.png', '../../../assets/imgs/tool5.png'];
  fruitImages: string[] = ['../../../assets/imgs/fruit1.png', '../../../assets/imgs/fruit2.png', '../../../assets/imgs/fruit3.png', '../../../assets/imgs/fruit4.png', '../../../assets/imgs/fruit5.png', '../../../assets/imgs/fruit6.png', '../../../assets/imgs/fruit7.png', '../../../assets/imgs/fruit8.png'];

  constructor(private alertController: AlertController) {}

  ngOnInit() {}


  startGame() {
    this.timer = 0;
    this.matchedPairs = 0;
    this.flippedCards = []; 
    this.cards = this.generateCards();
    this.shuffleCards();
    this.startTimer();
    this.gameStarted = true; // Marca el juego como iniciado
    this.gameFinished = false; // Asegura que el juego no está en estado finalizado
  }

  onDifficultyChange(event: any) {
  this.difficulty = event.detail.value;
  console.log('Dificultad seleccionada:', this.difficulty);
  }

  generateCards(): any[] {
    let images: string[] = [];
    if (this.difficulty === 'facil') {
      images = [...this.animalImages, ...this.animalImages];
    } else if (this.difficulty === 'medio') {
      images = [...this.toolImages, ...this.toolImages];
    } else if (this.difficulty === 'dificil') {
      images = [...this.fruitImages, ...this.fruitImages];
    }

    return images.map((image) => ({
      image,
      flipped: false,
      matched: false
    }));
  }

  shuffleCards() {
    this.cards.sort(() => 0.5 - Math.random());
  }

  
    reproducirSonidoSplash() {
    try {
    const sound = new Howl({
      src: ['assets/sounds/bye-bye-soundbible.mp3'],
      volume: 0.8
    });

    sound.play();
    }catch (e) {
      console.log('Audio bloqueado por navegador');
    }
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.reproducirSonidoSplash();
    this.router.navigateByUrl('/ingreso');
  }

  flipCard(index: number) {
    const card = this.cards[index];

    if (card.flipped || card.matched || this.flippedCards.length === 2) {
      return;
    }

    card.flipped = true;
    this.flippedCards.push(index);

    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  checkForMatch() {
    const [firstIndex, secondIndex] = this.flippedCards;
    const firstCard = this.cards[firstIndex];
    const secondCard = this.cards[secondIndex];

    if (firstCard.image === secondCard.image) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.matchedPairs++;

      if (this.matchedPairs === this.cards.length / 2) {
        this.endGame();
      }
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
      }, 1000);
    }

    this.flippedCards = [];
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  endGame() {
    this.puntajeService.GuardarPuntaje(this.timer, this.difficulty);
    this.stopTimer();
    this.gameFinished = true; // Muestra el mensaje de juego terminado
    this.gameStarted = false; // Para ocultar el juego

    // Mostrar el mensaje por 5 segundos
    setTimeout(() => {
      this.gameFinished = false; // Oculta el mensaje de juego terminado
    }, 3000);
  }

}
