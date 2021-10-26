import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { StorageTimerService } from '../shared/services/data/storage-timer.service';
import { StimerDueloComponent } from '../stimer-classes/stimer-duelo.component';

@Component({
  selector: 'app-stimer-duelo20s',
  templateUrl: './stimer-duelo20s.component.html',
  styleUrls: ['./stimer-duelo20s.component.scss']
})
export class StimerDuelo20sComponent extends StimerDueloComponent  {
  
  /** */
  constructor(public timerStorageService: StorageTimerService, public formBuilder: FormBuilder) {
    super(timerStorageService, formBuilder);
    this.timerStorageService.from = 'duelo20s';
  }

  /** */
  ngOnInit() {
    this.numeroSeries = 4;
    super.ngOnInit();
    if(this.tempoOffset != this.tempoTotal) {
      this.iniciar();
    }       
  }

  /** */
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /** */
  iniciar() {    
    this.whatcher = this.timer.subscribe(val => {
      if(this.tempoOffset == this.tempoTotal) {
        this.tempo = this.tempoTotal - val;
      } else {
        this.tempo = this.tempoOffset - val;
      }  
      switch(this.tempo) { 
        /** Seu tempo de 1 minuto de preparação começa a partir de agora */
        case this.tempoPrePreparaca() : {
          this.status = 'preparacao';
          this.output = this.texto[0]; 
          this.falar();
          this.splitStartFrom(this.tempoDePreparacao());
          break; 
        } 
        /** Para a primeira série, carregar */
        case this.tempoPosPreparaca() : {
          this.splitStop();
          this.output = this.texto[1]; 
          this.falar(); 
          break; 
        } 
        /** Atenção: antes da primeira série */
        case this.tempoPosPreparaca() - this.tempoVoz : {
          this.splitStop();
          this.output = this.texto[2];
          this.falar();
          this.splitStartFrom(this.tempoAtencao);
          break;
        }        
        /** Apito de início da primeira série */
        case this.tempoInicioPrimeiraSerie() : {
          this.status = 'primeira';
          this.splitStop();
          this.apitar(); 
          this.splitStartFrom(this.tempoProva);
          break;
        }
        /** Fala/texto de início da primeira série */
        case this.tempoInicioPrimeiraSerie() - this.tempoVoz : {
          this.output = 'Primeira série iniciada'; 
          this.falar();
          break;
        }
        /** Apito do final da primeira série */
        case this.tempoFinalPrimeiraSerie() : {
          this.splitStop();
          this.apitar(); 
          this.splitStartFrom(this.tempoDeIntervalo());
          break;
        }
        /** Fala/texto do final da primeira série */
        case this.tempoFinalPrimeiraSerie() - this.tempoVoz : {
          this.output = 'Primeira série finalizada'; 
          this.falar();
          break;
        } 
        /** Atenção: antes da segunda série */
        case this.tempoAtencaoInicioSegundaSerie() : {
          this.splitStop();
          this.output = this.texto[2];
          this.falar();
          this.splitStartFrom(this.tempoAtencao);
          break;
        }     
        /** Apito do início da segunda série */      
        case this.tempoInicioSegundaSerie() : {
          this.status = 'segunda';
          this.splitStop();
          this.apitar();
          this.splitStartFrom(this.tempoProva);
          break;
        }
        /** Fala/texto do início da segunda série */
        case this.tempoInicioSegundaSerie() - this.tempoVoz : {
          this.output = 'Segunda série iniciada'; 
          this.falar();
          break;
        } 
        /** Apito do final da segunda série */
        case this.tempoFinalSegundaSerie() : {
          this.splitStop(); 
          this.apitar();
          this.splitStartFrom(this.tempoDeIntervalo()); 
          break;
        } 
        /** Fala/texto do final da segunda série */
        case this.tempoFinalSegundaSerie() - this.tempoVoz : {
          this.output = 'Segunda série finalizada';  
          this.falar();
          break;
        }  
        /** Atenção: antes da terceira série */
        case this.tempoAtencaoInicioTerceiraSerie() : {
          this.status = 'terceira';
          this.splitStop();
          this.output = this.texto[2];
          this.falar();
          this.splitStartFrom(this.tempoAtencao);
          break;
        }  
        /** Apito do início da terceira série */       
        case this.tempoInicioTerceiraSerie() : { 
          this.splitStop();
          this.apitar();
          this.splitStartFrom(this.tempoProva);
          break;
        } 
        /** Fala/texto do início da terceira série */ 
        case this.tempoInicioTerceiraSerie() - this.tempoVoz : { 
          this.output = 'Terceira série iniciada'; 
          this.falar();
          break;
        } 
        /** Apito do final da terceira série */        
        case this.tempoFinalTerceiraSerie() : {
          this.splitStop();
          this.apitar();
          this.splitStartFrom(this.tempoDeIntervalo());
          break;
        } 
        /** Fala/texto do final da terceira série */
        case this.tempoFinalTerceiraSerie() - this.tempoVoz : {
          this.output = 'Terceira série finalizada'; 
          this.falar();
          break;
        }
        /** Atenção: antes da quarta série */
        case this.tempoAtencaoInicioQuartaSerie() : {
          this.splitStop();
          this.output = this.texto[2];
          this.falar();
          this.splitStartFrom(this.tempoAtencao);
          break;
        }         
        /** Apito do início da quarta série */       
        case this.tempoInicioQuartaSerie() : { 
          this.status = 'quarta';
          this.splitStop();
          this.apitar();
          this.splitStartFrom(this.tempoProva);
          break;
        } 
        /** Fala/texto do início da quarta série */  
        case this.tempoInicioQuartaSerie() - this.tempoVoz : { 
          this.output = 'Quarta série iniciada'; 
          this.falar();
          break;
        }  
        /** Apito do final da quarta série: prova finalizada */      
        case this.tempoFinalQuartaSerie() : {
          this.status = 'finalizada';
          this.splitStop();
          this.apitar();     
          break;
        }
        /** Fala/texto do final da quarta série: prova finalizada */
        case this.tempoFinalQuartaSerie() - this.tempoVoz : {
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
