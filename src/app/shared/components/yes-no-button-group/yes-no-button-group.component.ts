import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UniqueIdService } from './../../unique-id/unique-id.service';

/**
 * Possíveis valores que pode assumir
 * o estado do componente
 */
enum YesNoButtonGroupOptions {
  YES = 'yes',
  NO = 'no',
}

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  /**
   * Declara o provedor para o VALUE ACCESSOR
   */
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      /** 
       * Declaração "assíncrona", já que o componente "yes-no" 
       * ainda não está disponível para o provedor
       */
      useExisting: forwardRef(() => YesNoButtonGroupComponent),
    },
  ],
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {
  /**
   * Recebe o estado de habilitação do componente
   */
  @Input() disabled = false;
  /** 
   * Recebe o valor marcado 
   */
  @Input() public value: string = '';
   /** 
    * Recebe o texto de exibição 
    */
  @Input() public label = '';  
   /**
    * Externaliza um evento que leva uma variável string
    */
  @Output() public valueChange = new EventEmitter<string>();   
  /**
   * @see YesNoButtonGroupOptions
   */
  public options = YesNoButtonGroupOptions;
  /**
   * Event handler que informa que ouve mudança
   * no modelo associado ao componente
   * OBS: inicializa c/ uma função vazia
   * @param value
   */
  public onChange = (value: string) => {};
  /**
   * Event handler que informa que o componente
   * foi "tocado"
   * OBS: inicializa c/ uma função vazia
   * @param value
   */
  public onTouched = () => {};
  /**
   * ID "uuid" html gerado com unicidade 
   */
  public id: string = '';

  /** */
  constructor(private uniqueIdService : UniqueIdService) {
    this.id = uniqueIdService.generateUniqueIdWithPrefix('yes-no-button-group');
  }

  /** */
  ngOnInit(): void {}

  /**
   * Mudou alguma coisa no modelo, esse método é disparado
   * @param value string
   */
  public writeValue(value: string): void {
    /** salva o valor no componente */
    this.value = value; 
    /** dispara o evento de mudança */ 
    this.onChange(this.value); 
    /** Emite o valor para o "mundo externo" (output) */
    this.valueChange.emit(this.value);
  }

  /**
   * Registra a função do onChange
   * @param fn (value: string) => void
   */
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Quando o elemento é "tocado"
   * @param fn () => void
   */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Para uso futuro
   * @param isDisabled 
   */
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * @param value
   */
  public activate(value: string): void {
    this.writeValue(value);
  }

  /**
   * @param value
   * @returns boolean
   */
  public activated(value: string): boolean {
    return this.value === value;
  }
}
