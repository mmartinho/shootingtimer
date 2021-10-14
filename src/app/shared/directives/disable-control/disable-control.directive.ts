import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]'
})
export class DisableControlDirective implements OnChanges {
  /**
   * Aceita o estado a ser configurado
   */
  @Input() appDisableControl = false;

  /**
   * @property ngControl - Controle do angular que precisamos acessar 
   */
  constructor(private ngControl: NgControl) { }
  
  /**
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.appDisableControl) {
      const action = this.appDisableControl ? 'disable' : 'enable';
      this.ngControl.control[action]();
    } 
  }

}
