import { Routes } from '@angular/router';
import { OwncardsComponent } from './pages/my-own-cards/owncards/owncards.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    { 
        path: 'home', 
        component: WelcomeComponent,
        title: "home"
    },
    { 
        path: 'owncards', 
        component: OwncardsComponent,
        title: "my cards" 
    }
    
];
