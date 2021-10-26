import { Injectable } from '@angular/core';

const KEY = 'timer';

@Injectable({
  providedIn: 'root'
})
export class StorageTimerService {
  public from: string='';

  /** */
  constructor() { }

  /** */
  hasStatus() : boolean {
    return !!this.getStatus();
  }  

  /** */
  setStatus(status: string): void {
    window.localStorage.setItem(KEY+'_'+this.from+'_status', status);
  }

  /** */
  getStatus() : string {
    const stored = window.localStorage.getItem(KEY+'_'+this.from+'_status')?.toString();
    return stored ? stored : '';
  }

  /** */
  removeStatus(): void {
    window.localStorage.removeItem(KEY+'_'+this.from+'_status');
  }

  /** */
  setPreparacaoReduzida(value: boolean): void {
    const valor = value ? 'yes' : 'no';
    window.localStorage.setItem(KEY+'_'+this.from+'_preparacaoReduzida', valor);  
  }

  /** */
  getPreparacaoReduzida() : boolean {
    const stored = window.localStorage.getItem(KEY+'_'+this.from+'_preparacaoReduzida')?.toString();
    return stored == 'yes' ? true : false;
  } 
  
  /** */
  removePreparacaoReduzida(): void {
    window.localStorage.removeItem(KEY+'_'+this.from+'_preparacaoReduzida');
  }  

  /** */
  setIntervaloReduzido(value: boolean): void {
    const valor = value ? 'yes' : 'no';
    window.localStorage.setItem(KEY+'_'+this.from+'_intervaloReduzido', valor);  
  } 
  
  /** */
  getIntervaloReduzido() : boolean {
    const stored = window.localStorage.getItem(KEY+'_'+this.from+'_intervaloReduzido')?.toString();
    return stored == 'yes' ? true : false;
  }  

  /** */
  removeIntervaloReduzido(): void {
    window.localStorage.removeItem(KEY+'_'+this.from+'_intervaloReduzido');
  }   
}
