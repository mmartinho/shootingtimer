import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelResponsivoComponent } from './painel-responsivo.component';

@NgModule({
  declarations: [PainelResponsivoComponent],
  imports: [
    CommonModule
  ],
  exports : [PainelResponsivoComponent]
})
export class PainelResponsivoModule { }
