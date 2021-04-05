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
  status: string = '';
  output: string = '';
  serie_atual: number = 0;

  timer!: Observable<any>;

  constructor() { }

  ngOnInit(): void {
    this.timer = timer(0, 1000);
  }

  iniciarPreparacao(): void {
    this.status = 'iniciar-preparacao';
    this.output = this.texto[0];
    this.tempo = this.tempoPreparacao;
    const tempoPreparacao = this.timer.subscribe(val => {
      if(this.tempo != 0) { 
        this.tempo = this.tempoPreparacao - val;
      } else {
        this.status = 'atencao';
        this.output = this.texto[1];
        tempoPreparacao.unsubscribe();
      }
    });
  }

  iniciarAtencao() : void {
    this.status = 'atencao-iniciada';
    this.output = this.texto[2];
    this.tempo = this.tempoAtencao;
    const tempoAtencao = this.timer.subscribe(val => {
      if(this.tempo != 0) { 
        this.tempo = this.tempoAtencao - val;
      } else {
        this.status = 'serie';
        tempoAtencao.unsubscribe();
      }
    });    
  }

  iniciarSerie() : void {
    this.serie_atual++;
    this.status = 'serie-iniciada';
    this.output = 'Série '+this.serie_atual+' iniciada';
    this.tempo = this.tempoProva;
    const tempoProva = this.timer.subscribe(val => {
      if(this.tempo != 0) { 
        this.tempo = this.tempoProva - val;
      } else {
        if(this.serie_atual == this.numeroSeries) {
          this.status = 'prova-finalizada';
          this.output = this.texto[3];          
        } else {
          this.status = 'intervalo';
        }
        tempoProva.unsubscribe();
      }
    });
  }

  iniciarIntervalo() : void {
    this.status = 'intervalo-iniciado';
    this.output = 'Intervalo pós série '+this.serie_atual;
    this.tempo = this.tempoIntervalo;
    const tempoIntervalo = this.timer.subscribe(val => {
      if(this.tempo != 0) { 
        this.tempo = this.tempoIntervalo - val;
      } else {
        this.status = 'serie';
        tempoIntervalo.unsubscribe();
      }
    });     
  }

  zerarTempo() : void {
    this.tempo = 0;
  }

}
