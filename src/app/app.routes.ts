import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwncardsComponent } from './pages/my-own-cards/owncards/owncards.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LibraryComponent } from './pages/library/library.component';
import { CardinfoComponent } from './pages/cardinfo/cardinfo.component';
import { DailypredictionComponent } from './components/dailyprediction/dailyprediction.component';
import { SpreadInterpretationComponent } from './pages/spread-interpretation/spread-interpretation.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    { 
        path: 'home', 
        component: WelcomeComponent, 
    },
    { 
        path: 'spread', 
        component: OwncardsComponent,
         
    },
    {
        path: 'library', 
        component: LibraryComponent,  
    },
    {
        path: 'dailyprediction/:id', 
        component: DailypredictionComponent,  
    },
    {
        path: 'cardinfo/:id', 
        component: CardinfoComponent,  
    },
    {
        path: 'spreadInterpretation', 
        component: SpreadInterpretationComponent,  
    },
   
    
];

@NgModule({
    imports: 
    [ RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule],
    providers: [ { provide: LocationStrategy, useClass: HashLocationStrategy }],
})

export class AppRoutingModule {}