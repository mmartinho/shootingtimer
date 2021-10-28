import { Component, Input, OnInit } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit {

  /** Receptor da mensagem de texto */
  @Input() receptor: Subject<string> ;

  /** A mensagem de texto */
  texto: string = '';

  constructor() { }

  /** */
  ngOnInit(): void {
    this.receptor.subscribe(texto => {
      /** Recebe a mensagem e repassa para o componente */
      this.texto = texto;
      /** Temporiza 5s para apagar a mensagem */
      timer(0, 5000).pipe(take(2)).subscribe(i => { 
        if(i === 0) {
          // faz nada
        } else {
          this.texto = '';
        }
      });
    });
  }
}
