import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-stimer-duelo20s',
  templateUrl: './stimer-duelo20s.component.html',
  styleUrls: ['./stimer-duelo20s.component.scss']
})
export class StimerDuelo20sComponent implements OnInit {
  texto: string[] = [
    'Seu tempo de 1 minuto de preparação começa a partir de agora',
    'Para a primeira série, carregar',
    'Atenção',
    'Prova encerrada - armas em segurança'
  ];
  tempoProva : number = 20;
  tempoIntervalo : number = 40;
  tempoPreparacao : number = 60;
  tempoAtencao : number = 7;
  numeroSeries: number = 4;

  tempo : number = 0;
  tempoTotal : number = 0;
  split: number = 0;
  status: string = '';
  output: string = '';
  serie_atual: number = 0;

  timer!: Observable<any>;
  whatcher!: Subscription;

  timeSpliter!: Observable<any>;
  whatcherSpliter!: Subscription;

  interativo: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.timer = timer(0, 1000);
    this.timeSpliter = timer(0, 1000);
  }

  iniciarPreparacao(): void {
    this.interativo = true;
    this.status = 'iniciar-preparacao';
    this.output = this.texto[0];
    this.tempo = this.tempoPreparacao;
    this.whatcher  = this.timer.subscribe(val => {
      if(this.tempo != 0) { 
        this.tempo = this.tempoPreparacao - val;
      } else {
        this.status = 'atencao';
        this.output = this.texto[1];
        this.whatcher.unsubscribe();
      }
    });
  }

  iniciarAtencao() : void {
    this.status = 'atencao-iniciada';
    this.output = this.texto[2];
    this.tempo = this.tempoAtencao;
    this.whatcher = this.timer.subscribe(val => {
      if(this.tempo != 0) { 
        this.tempo = this.tempoAtencao - val;
      } else {
        this.status = 'serie';
        this.whatcher.unsubscribe();
      }
    });    
  }

  iniciarSerie() : void {
    this.serie_atual++;
    this.status = 'serie-iniciada';
    this.output = 'Série '+this.serie_atual+' iniciada';
    this.tempo = this.tempoProva;
    this.whatcher = this.timer.subscribe(val => {
      if(this.tempo != 0) { 
        this.tempo = this.tempoProva - val;
      } else {
        if(this.serie_atual == this.numeroSeries) {
          this.status = 'prova-finalizada';
          this.output = this.texto[3];          
        } else {
          this.status = 'intervalo';
        }
        this.whatcher.unsubscribe();
      }
    });
  }

  iniciarIntervalo() : void {
    this.status = 'intervalo-iniciado';
    this.output = 'Intervalo pós série '+this.serie_atual;
    this.tempo = this.tempoIntervalo;
    this.whatcher = this.timer.subscribe(val => {
      if(this.tempo != 0) { 
        this.tempo = this.tempoIntervalo - val;
      } else {
        this.status = 'serie';
        this.whatcher.unsubscribe();
      }
    });     
  }

  parar() : void {
    this.whatcher.unsubscribe();
    this.tempo = 0;
    this.status = '';
    this.output = '';
    this.serie_atual = 0;
  }

  pausar(): void {
    this.tempo = 0;
  }

  iniciarTudo() {
    this.interativo = false;
    /**
     * Soma todos os tempos
     */
    this.tempoTotal =
      this.tempoPreparacao +
      this.tempoAtencao +
      this.numeroSeries*this.tempoProva + 
      (this.numeroSeries-1)*this.tempoIntervalo;

    this.tempo = this.tempoTotal;
    this.status='iniciou-tudo';
    this.output = this.texto[0];
    
    this.whatcher = this.timer.subscribe(val => {
      this.tempo = this.tempoTotal - val;
      switch(this.tempo) { 
        case this.tempoTotal : { 
          this.output = this.texto[0]; this.falar();
          this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = this.tempoPreparacao - time });
          break; 
        } 
        case this.tempoTotal - this.tempoPreparacao : {
          this.whatcherSpliter.unsubscribe();
          this.output = this.texto[1]; 
          this.falar(); 
          this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = this.tempoAtencao - time });
          break; 
        } 
        case this.tempoTotal - this.tempoPreparacao - this.tempoAtencao: {
          this.whatcherSpliter.unsubscribe();
          this.output = 'Primeira série iniciada'; this.apitar(); this.falar();
          this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = this.tempoProva - time });
          break;
        }          
        case this.tempoTotal - this.tempoPreparacao - this.tempoAtencao - 1*this.tempoProva: {
          this.whatcherSpliter.unsubscribe();
          this.output = 'Primeira série finalizada'; this.apitar(); this.falar();
          this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = this.tempoIntervalo - time });
          break;
        }
        case this.tempoTotal - this.tempoPreparacao - this.tempoAtencao - 1*this.tempoProva - 1*this.tempoIntervalo: {
          this.whatcherSpliter.unsubscribe(); 
          this.output = 'Segunda série iniciada'; this.apitar(); this.falar();
          this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = this.tempoProva - time });
          break;
        }
        case this.tempoTotal - this.tempoPreparacao - this.tempoAtencao - 2*this.tempoProva - 1*this.tempoIntervalo: {
          this.whatcherSpliter.unsubscribe(); 
          this.output = 'Segunda série finalizada'; this.apitar(); this.falar();
          this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = this.tempoIntervalo - time });
          break;
        } 
        case this.tempoTotal - this.tempoPreparacao - this.tempoAtencao - 2*this.tempoProva - 2*this.tempoIntervalo: { 
          this.whatcherSpliter.unsubscribe();
          this.output = 'Terceira série iniciada'; this.apitar(); this.falar();
          this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = this.tempoProva - time });
          break;
        }  
        case this.tempoTotal - this.tempoPreparacao - this.tempoAtencao - 3*this.tempoProva - 2*this.tempoIntervalo: {
          this.whatcherSpliter.unsubscribe();
          this.output = 'Terceira série finalizada'; this.apitar(); this.falar();
          this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = this.tempoIntervalo - time });
          break;
        } 
        case this.tempoTotal - this.tempoPreparacao - this.tempoAtencao - 3*this.tempoProva - 3*this.tempoIntervalo: { 
          this.whatcherSpliter.unsubscribe();
          this.output = 'Quarta série iniciada'; this.apitar(); this.falar();
          this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = this.tempoProva - time });
          break;
        }   
        case this.tempoTotal - this.tempoPreparacao - this.tempoAtencao - 4*this.tempoProva - 3*this.tempoIntervalo: {
          this.whatcherSpliter.unsubscribe(); 
          this.output = this.texto[3]; this.apitar(); this.falar();
          this.status = 'prova-finalizada';
          this.whatcher.unsubscribe(); 
          this.split = 0;           
          break;
        }
        case 0 : {
          break;
        }                                              
        default: {  
            break; 
        } 
      } 
    });     
  }

  pararTudo() {
    this.whatcherSpliter.unsubscribe(); 
    this.tempoTotal = 0;
    this.output = '';
    this.status = '';
    this.whatcher.unsubscribe();
    this.split = 0;
    this.interativo = true;
  }

  falar() {
    let audio = new SpeechSynthesisUtterance(this.output);
    audio.pitch = 1.0;
    audio.rate = 1.0;
    audio.lang = 'pt-BR';
    speechSynthesis.speak(audio);
  }

  apitar() {
    let audio = new Audio();
    audio.src = "../../assets/mp3/apito.mp3";
    audio.load();
    audio.play();
  }
}
