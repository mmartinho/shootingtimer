import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-atencao',
  templateUrl: './atencao.component.html',
  styleUrls: ['./atencao.component.scss']
})
export class AtencaoComponent implements OnInit {
  @Input() status: string = '';

  /** */
  constructor() { }

  /** */
  ngOnInit(): void {
  }

  /** */
  posicaoGif() {
    const path = 'assets/gifs/';
    switch(this.status) {
      case 'Atenção!' : return path+'posicao_45_graus.gif';
      case 'Primeira série iniciada' :
      case 'Segunda série iniciada'  :
      case 'Terceira série iniciada' :
      case 'Quarta série iniciada'   : return path+'posicao_tiro.gif';
      case 'Prova encerrada - armas em segurança' : return path+'safety_flag.jpg';
      default : return path+'posicao_preparacao.gif';     
    }
  }

  /** */
  posicaoTexto() {
    return this.status;
  }

}
