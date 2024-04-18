import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwncardsComponent } from './pages/my-own-cards/owncards/owncards.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LibraryComponent } from './pages/library/library.component';
import { CardinfoComponent } from './pages/cardinfo/cardinfo.component';

export const routes: Routes = [
    { 
        path: 'https://gordienko-andrei.github.io/tarot-test/tarot-project-new/', 
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
        path: 'cardinfo/:id', 
        component: CardinfoComponent,  
    }
   
    
];

