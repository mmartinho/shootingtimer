import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StimerNavigationComponent } from './stimer-navigation/stimer-navigation.component';
import { StimerInitialComponent } from './stimer-initial/stimer-initial.component';
import { StimerDuelo20sComponent } from './stimer-duelo20s/stimer-duelo20s.component';
import { StimerPageNotFoundComponent } from './stimer-page-not-found/stimer-page-not-found.component';
import { StimerAboutComponent } from './stimer-about/stimer-about.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    StimerNavigationComponent,
    StimerInitialComponent,
    StimerDuelo20sComponent,
    StimerPageNotFoundComponent,
    StimerAboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
