import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StimerAboutComponent } from './stimer-about/stimer-about.component';
import { StimerDuelo20sComponent } from './stimer-duelo20s/stimer-duelo20s.component';
import { StimerInitialComponent } from './stimer-initial/stimer-initial.component';
import { StimerPageNotFoundComponent } from './stimer-page-not-found/stimer-page-not-found.component';

const routes: Routes = [
  {  
    path: 'p/initial',
    component: StimerInitialComponent  
  },
  {  
    path: 'p/duelo20s',
    component: StimerDuelo20sComponent  
  },
  {  
    path: 'p/sobre',
    component: StimerAboutComponent  
  },  
  {
    path: '', 
    redirectTo: 'p/initial', 
    pathMatch: 'full'
  },
  {
    path: '**', component: StimerPageNotFoundComponent
  }      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
