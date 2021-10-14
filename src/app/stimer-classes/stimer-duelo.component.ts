import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

/** 
 * Componente Super Class 
 */
@Component({
    //selector: 'app-stimer-duelo',
    templateUrl: './stimer-duelo.component.html',
    //styleUrls: ['./stimer-duelo.component.scss']    
})
export class StimerDueloComponent implements OnInit {
    @Input() status: string = '';
    texto: string[] = [
        'Seu tempo de 1 minuto de preparação começa a partir de agora',
        'Para a primeira série, carregar',
        'Atenção',
        'Prova encerrada - armas em segurança'
    ];
    tempoProva : number = 20;
    tempoIntervalo : number = 40;
    tempoIntervaloReduzido : number = 0;
    tempoPreparacao : number = 60;
    tempoPreparacaoReduzido = 0;
    tempoVoz : number = 2;
    tempoAtencao : number = 7;
    numeroSeries : number = 4;
    
    tempo : number = 0;
    tempoTotal : number = 0;
    split: number = 0;
    output: string = '';
    serie_atual: number = 0;

    timer!: Observable<any>;
    whatcher!: Subscription;

    timeSpliter!: Observable<any>;
    whatcherSpliter!: Subscription;
    
    /** */
    ngOnInit(): void {
        /** Timer geral */
        this.timer = timer(0, 1000);
        /** Timer parcial */
        this.timeSpliter = timer(0, 1000);
        /** Soma todos os tempos */
        this.tempoTotal =
            (this.tempoPreparacaoReduzido > 0 ? this.tempoPreparacaoReduzido : this.tempoPreparacao) +
            this.numeroSeries*this.tempoAtencao +
            this.numeroSeries*this.tempoProva + 
            (this.numeroSeries-1)*(this.tempoIntervaloReduzido > 0 ? this.tempoIntervaloReduzido : this.tempoIntervalo);        
    }

    /** */
    protected splitStartFrom(seconds: number){
        this.whatcherSpliter = this.timeSpliter.subscribe(time => { this.split = seconds - time });
    }

    /** */
    protected splitStop() {
        this.whatcherSpliter.unsubscribe();
        this.split = 0;
    }

    /** */
    parar() {
        this.splitStop();
        this.tempoPreparacaoReduzido = 0;
        this.tempoIntervaloReduzido = 0;
        this.tempoTotal = 0;
        this.output = '';
        this.status = '';
        this.whatcher.unsubscribe();
    } 
    
    /** */
    falar() {
        let audio = new SpeechSynthesisUtterance(this.output);
        audio.pitch = 1.0;
        audio.rate = 1.0;
        audio.lang = 'pt-BR';
        speechSynthesis.speak(audio);
    }

    /** */
    apitar() {
        let audio = new Audio();
        audio.src = "assets/mp3/apito.mp3";
        audio.load();
        audio.play();
    }  
    
    /** */
    iniciar() {
    }

    /**
     * @param valor 
     */
    onChangePreparacao(valor: string) {
        if(valor == 'yes') {
            /** 30% do tempo */
            this.tempoPreparacaoReduzido = Math.ceil((this.tempoPreparacao*30)/100);
        } else {
            this.tempoPreparacaoReduzido = 0;
        }
    }

    /**
     * @param valor 
     */
     onChangeIntervalo(valor: string) {
        if(valor == 'yes') {
            /** 30% do tempo */
            this.tempoIntervaloReduzido = Math.ceil((this.tempoIntervalo*30)/100);
        } else {
            this.tempoIntervaloReduzido = 0;
        }
    }    
}