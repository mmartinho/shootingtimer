import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StimerDuelo20sComponent } from './stimer-duelo20s/stimer-duelo20s.component';
import { StimerInitialComponent } from './stimer-initial/stimer-initial.component';

const routes: Routes = [
  {  
    path: 'p/initial',
    component: StimerInitialComponent  
  },
  {  
    path: 'p/duelo20s',
    component: StimerDuelo20sComponent  
  }      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
