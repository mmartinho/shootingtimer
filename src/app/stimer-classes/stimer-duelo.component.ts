import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription, timer } from 'rxjs';

import { StorageTimerService } from '../shared/services/data/storage-timer.service';

/** 
 * Componente "Super Class" 
 */
@Component({
    //selector: 'app-stimer-duelo',
    templateUrl: './stimer-duelo.component.html',
    //styleUrls: ['./stimer-duelo.component.scss']    
})
export class StimerDueloComponent implements OnInit, OnDestroy {
    /** Estado atual do timer geral */
    @Input('status')
    private _status: string = '';

    /** Get status */
    public get status(): string {
        return this._status;
    }

    /** Set status */
    public set status(value: string) {
        this._status = value;
        if(this._status == 'finalizada') {
            this.timerStorageService.removeStatus();
        } else if(this._status != ''){
            this.timerStorageService.setStatus(this._status);
        }
    }

    /** Mensagens de texto formais de orientação da disciplina */
    texto: string[] = [
        'Seu tempo de 1 minuto de preparação começa a partir de agora',
        'Para a primeira série, carregar',
        'Atenção!',
        'Prova encerrada - armas em segurança'
    ];

    // ------- Tempos inteiros em segundos ----------

    /** Tempo de prova de cada série */
    tempoProva : number = 20;
    /** Tempo de intervalo entre as séries */
    tempoIntervalo : number = 40;
    /** 30% do tempo de intervalo entre as séries */
    tempoIntervaloReduzido : number = 0;
    /** Tempo de preparação do atleta */
    tempoPreparacao : number = 60;
    /** 30% do tempo de preparação do atleta */
    tempoPreparacaoReduzido = 0;
    /** Tempo após o comando de atenção */
    tempoAtencao : number = 7;
    /** Tempo de sincronização do sintetizador de voz */
    tempoVoz : number = 2;

    /** Número total de séries */
    numeroSeries : number = 4;
    
    /** Tempo geral corrente */
    tempo : number = 0;
    /** Tempo parcial */
    split: number = 0;

    /** Tempo total definido para o timer */
    tempoTotal : number = 0;
    /** Tempo total considerando prova em andamento */
    tempoOffset : number = 0;

    /** Saída de texto das mensagens de orientação */
    output: string = '';

    /** Timer geral */
    timer!: Observable<any>;
    /** Timer parcial */
    timeSpliter!: Observable<any>;

    /** Subscrição do timer geral */
    whatcher!: Subscription;
    /** Subscrição do timer parcial */
    whatcherSpliter!: Subscription;

    /** Serviço de armazenamento local */
    timerStorageService!: StorageTimerService;

    /** Formulário de controle das funções "Luís" */
    form: FormGroup;

    /** Mensagem qualquer */
    transmissor: Subject<string> = new Subject();

    /** */
    constructor(
        timerStorageService: StorageTimerService, 
        formBuilder: FormBuilder) 
    {
        this.timerStorageService = timerStorageService;
        this.form = formBuilder.group({
            yesNoAnswerIntervaloReduzido: [{
                value: 'no',
                disabled: false
            }],
            yesNoAnswerPreparacaoReduzida: [{
                value: 'no',
                disabled: false
            }],            
        });    
    }

    /** 
     * Após o final do ciclo de vida do componente 
     */
    ngOnDestroy(): void {}
    
    /** 
     * Início do ciclo de vida do componente 
     */
    ngOnInit(): void {
        this.timerInit();
    }

    /** */
    timerInit(): void {
        if(this.timerStorageService.getIntervaloReduzido()) {
            this.mudarIntervalo('yes');
        } else {
            this.mudarIntervalo('no');
        }
        if(this.timerStorageService.getPreparacaoReduzida()) {
            this.mudarPreparacao('yes');
        } else {
            this.mudarPreparacao('no');
        }
        this.timer = timer(0, 1000);
        this.timeSpliter = timer(0, 1000);
        this.tempoTotal = this.tempoDePreparacao() + this.tempoDeSeries();
        this.status = this.timerStorageService.getStatus();
        switch(this.status) {
            case 'primeira' : 
                this.tempoOffset = this.tempoPosPreparaca() - this.tempoVoz + 1;      
            break;
            case 'segunda' :
                this.tempoOffset = this.tempoAtencaoInicioSegundaSerie() + 1;
            break;
            case 'terceira' :
                this.tempoOffset = this.tempoAtencaoInicioTerceiraSerie() + 1;
            break; 
            case 'quarta' :
                this.tempoOffset = this.tempoAtencaoInicioQuartaSerie() + 1;
            break;                       
            default: 
                this.tempoOffset = this.tempoTotal;
        }         
    }

    /**
     * Tempo TOTAL a ser usado na preparação
     * @returns number
     */
    protected tempoDePreparacao(): number {
        return this.tempoPreparacaoReduzido > 0 ? 
            this.tempoPreparacaoReduzido : 
            this.tempoPreparacao;
    }

    /**
     * Tempo TOTAL a ser usado em todos os intervalos
     * @returns number
     */
    protected tempoDeIntervalo(): number {
        return this.tempoIntervaloReduzido > 0 ?
            this.tempoIntervaloReduzido :
            this.tempoIntervalo;        
    }    

    /**
     * Tempo TOTAL a ser usado em todas as séries
     * @returns number
     */
    protected tempoDeSeries(): number {
        return this.numeroSeries*this.tempoAtencao +
            this.numeroSeries*this.tempoProva + 
            (this.numeroSeries-1)*this.tempoDeIntervalo();
    }

    /**
     * Tempo pré preparação
     * @returns 
     */
    protected tempoPrePreparaca(): number {
        return this.tempoTotal;
    }    

    /**
     * Tempo após preparação antes do início das séries
     * @returns 
     */
    protected tempoPosPreparaca(): number {
        return this.tempoTotal - this.tempoDePreparacao();
    }

    // --------------------------------- Primeira Série -----------------------------------------

    /**
     * Tempo antes da primeira série após o tempo de atenção
     * @returns number
     */
    protected tempoInicioPrimeiraSerie(): number { 
        return this.tempoPosPreparaca() - this.tempoAtencao;
    }

    /**
     * Tempo após a primeira série
     * @returns 
     */
    protected tempoFinalPrimeiraSerie(): number {
        return this.tempoInicioPrimeiraSerie() - this.tempoProva
    }

    // --------------------------------- Segunda Série ------------------------------------------

    /**
     * Tempo antes da segunda série antes do tempo de atenção
     * @returns 
     */
    protected tempoAtencaoInicioSegundaSerie(): number {
        return this.tempoFinalPrimeiraSerie() - this.tempoDeIntervalo()
    }

    /**
     * Tempo antes da segunda série depois do tempo de atenção
     * @returns 
     */
    protected tempoInicioSegundaSerie(): number {
        return this.tempoFinalPrimeiraSerie() - this.tempoDeIntervalo() - this.tempoAtencao;
    }    

    /** 
     * Tempo após a segunda série 
     */
    protected tempoFinalSegundaSerie(): number {
        return this.tempoInicioSegundaSerie() - this.tempoProva;
    }

    // --------------------------------- Terceira Série ----------------------------------------

    /**
     * Tempo antes da terceira série antes do tempo de atenção
     * @returns 
     */
    protected tempoAtencaoInicioTerceiraSerie(): number {
        return this.tempoFinalSegundaSerie() - this.tempoDeIntervalo()
    }

    /**
     * Tempo antes da terceira série depois do tempo de atenção
     * @returns 
     */
    protected tempoInicioTerceiraSerie(): number {
        return this.tempoFinalSegundaSerie() - this.tempoDeIntervalo() - this.tempoAtencao;
    }    

    /** 
     * Tempo após a terceira série 
     */
    protected tempoFinalTerceiraSerie(): number {
        return this.tempoInicioTerceiraSerie() - this.tempoProva;
    } 
    
    // --------------------------------- Quarta Série -----------------------------------------
  
    /**
     * Tempo antes da quarta série antes do tempo de atenção
     * @returns 
     */
    protected tempoAtencaoInicioQuartaSerie(): number {
        return this.tempoFinalTerceiraSerie() - this.tempoDeIntervalo()
    }

    /**
     * Tempo antes da quarta série depois do tempo de atenção
     * @returns 
     */
    protected tempoInicioQuartaSerie(): number {
        return this.tempoFinalTerceiraSerie() - this.tempoDeIntervalo() - this.tempoAtencao;
    }    

    /** 
     * Tempo após a quarta série 
     */
    protected tempoFinalQuartaSerie(): number {
        return this.tempoInicioQuartaSerie() - this.tempoProva;
    }

    // -----------------------------------------------------------------------------------------

    /** */
    protected splitStartFrom(seconds: number){
        this.whatcherSpliter = 
            this.timeSpliter?.subscribe(time => { this.split = seconds - time });
    }

    /** */
    protected splitStop() {
        this.whatcherSpliter?.unsubscribe();
        this.split = 0;
    }

    /** */
    parar() {
        this.splitStop();
        //this.tempoPreparacaoReduzido = 0;
        //this.tempoIntervaloReduzido = 0;
        this.tempoTotal = 0;
        this.output = '';
        this.status = '';
        this.whatcher.unsubscribe();
        this.timerStorageService.removeStatus();
        this.timerInit();
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

    /** */
    salvar() {
        const intervaloReduzido = this.form.controls['yesNoAnswerIntervaloReduzido'].value;
        const preparacaoReduzida = this.form.controls['yesNoAnswerPreparacaoReduzida'].value;
        this.mudarPreparacao(preparacaoReduzida);
        this.mudarIntervalo(intervaloReduzido);
        this.mandarMensagem('Configurações salvas no dispositivo local');
    }

    /**
     * Redefine o tempo de preparação reduzido/pleno
     * @param valor 
     */
    mudarPreparacao(valor: string) {
        if(valor == 'yes') {
            /** 30% do tempo */
            this.tempoPreparacaoReduzido = Math.ceil((this.tempoPreparacao*30)/100);
            this.timerStorageService.setPreparacaoReduzida(true);
        } else {
            this.tempoPreparacaoReduzido = 0;
            this.timerStorageService.removePreparacaoReduzida();
        }
        this.form.controls['yesNoAnswerPreparacaoReduzida'].setValue(valor);
    }

    /**
     * Redefine o tempo de intervalo reduzido/pleno
     * @param valor 
     */
    mudarIntervalo(valor: string) {
        if(valor == 'yes') {
            /** 30% do tempo */
            this.tempoIntervaloReduzido = Math.ceil((this.tempoIntervalo*30)/100);
            this.timerStorageService.setIntervaloReduzido(true);
        } else {
            this.tempoIntervaloReduzido = 0;
            this.timerStorageService.removeIntervaloReduzido();
        }
        this.form.controls['yesNoAnswerIntervaloReduzido'].setValue(valor);
    }    

    /**
     * Manda mensagem para o componente que 
     * subscreveu o texto
     * @param texto 
     */
    mandarMensagem(texto: string) {
        this.transmissor.next(texto);
    }
}