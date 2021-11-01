import { Component } from '@angular/core';

@Component({
    selector: 'app-stimer-initial',
    templateUrl: './stimer-initial.component.html',
    styleUrls: ['./stimer-initial.component.scss']
  })
  export class StimerInitialComponent {
    texto:string = '';

    /** */
    constructor() {}

    /**
     * 
     */
    emConstrucao() {
      this.texto = 
        'EM CONSTRUÇÃO. Utilize o menu do canto superior esquerdo para acessar as disciplinas';
    }
  }