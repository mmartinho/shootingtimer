import { Component } from '@angular/core';

@Component({
    selector: 'app-stimer-initial',
    templateUrl: './stimer-initial.component.html',
    styleUrls: ['./stimer-initial.component.scss']
  })
  export class StimerInitialComponent {
    
    texto:string = '';

    constructor(
      
    ) {}

    naoFazNadaNao() {
      this.texto = 'Faz nada não, meu querido, é só um demo';
    }
  
  }