import { Component } from '@angular/core';
import { StimerDueloComponent } from '../stimer-classes/stimer-duelo.component';

@Component({
  selector: 'app-stimer-duelo20s10m',
  templateUrl: './stimer-duelo20s10m.component.html',
  styleUrls: ['./stimer-duelo20s10m.component.scss']
})
export class StimerDuelo20s10mComponent extends StimerDueloComponent {
  /** */
  constructor() {super();}

  /** */
  ngOnInit() {
    this.numeroSeries = 2;
    super.ngOnInit();
  }

  /** */
  iniciar() {    
    this.whatcher = this.timer.subscribe(val => {
      this.tempo = this.tempoTotal - val;
      const tempoPreparacao = 
        this.tempoPreparacaoReduzido > 0 ? 
        this.tempoPreparacaoReduzido : 
        this.tempoPreparacao;
      const tempoIntervalo = 
        this.tempoIntervaloReduzido > 0 ?
        this.tempoIntervaloReduzido :
        this.tempoIntervalo;
      switch(this.tempo) { 
        /** Seu tempo de 1 minuto de preparação começa a partir de agora */
        case this.tempoTotal : {
          this.status = 'preparacao'; 
          this.output = this.texto[0]; 
          this.falar();
          this.splitStartFrom(tempoPreparacao);
          break; 
        } 
        /** Para a primeira série, carregar */
        case this.tempoTotal - tempoPreparacao : {
          this.splitStop();
          this.status = 'carregar';
          this.output = this.texto[1]; 
          this.falar(); 
          break; 
        } 
        /** Atenção: antes da primeira série */
        case this.tempoTotal - tempoPreparacao - this.tempoVoz : {
          this.splitStop();
          this.output = 'Atenção!'
          this.falar();
          this.splitStartFrom(this.tempoAtencao);
          break;
        }        
        /** Apito de início da primeira série */
        case this.tempoTotal - tempoPreparacao - this.tempoAtencao : {
          this.splitStop();
          this.status = 'primeira';
          this.apitar(); 
          this.splitStartFrom(this.tempoProva);
          break;
        }
        /** Fala/texto de início da primeira série */
        case this.tempoTotal - tempoPreparacao - this.tempoAtencao - 
             this.tempoVoz : {
          this.output = 'Primeira série iniciada'; 
          this.falar();
          break;
        }
        /** Apito do final da primeira série */
        case this.tempoTotal - tempoPreparacao - this.tempoAtencao - 
             this.tempoProva : {
          this.splitStop();
          this.apitar(); 
          this.splitStartFrom(tempoIntervalo);
          break;
        }
        /** Fala/texto do final da primeira série */
        case this.tempoTotal - tempoPreparacao - this.tempoAtencao - 
             this.tempoProva - this.tempoVoz : {
          this.output = 'Primeira série finalizada'; 
          this.falar();
          break;
        } 
        /** Atenção: antes da segunda série */
        case this.tempoTotal - tempoPreparacao - this.tempoAtencao - 
             this.tempoProva - tempoIntervalo : {
          this.splitStop();
          this.output = 'Atenção!'
          this.falar();
          this.splitStartFrom(this.tempoAtencao);
          break;
        }     
        /** Apito do início da segunda série */      
        case this.tempoTotal - tempoPreparacao - this.tempoAtencao - 
             this.tempoProva - tempoIntervalo  - this.tempoAtencao : {
          this.splitStop();
          this.apitar();
          this.splitStartFrom(this.tempoProva);
          break;
        }
        /** Fala/texto do início da segunda série */
        case this.tempoTotal - tempoPreparacao - this.tempoAtencao - 
             this.tempoProva - tempoIntervalo  - this.tempoAtencao - 
             this.tempoVoz : {
          this.output = 'Segunda série iniciada'; 
          this.falar();
          break;
        } 
        /** Apito do final da segunda série */
        case this.tempoTotal - tempoPreparacao - this.tempoAtencao - 
             this.tempoProva - tempoIntervalo  - this.tempoAtencao - 
             this.tempoProva : {
          this.status = 'finalizada';
          this.splitStop();
          this.apitar(); 
          break;
        } 
        /** Fala/texto do final de prova finalizada */
        case this.tempoTotal - tempoPreparacao - this.tempoAtencao - 
             this.tempoProva - tempoIntervalo  - this.tempoAtencao - 
             this.tempoProva - this.tempoVoz : {
            this.output = this.texto[3]; 
            this.falar(); 
            this.whatcher.unsubscribe(); 
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
}
