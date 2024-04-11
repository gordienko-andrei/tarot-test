import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwncardsComponent } from './pages/my-own-cards/owncards/owncards.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LibraryComponent } from './pages/library/library.component';

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
        path: 'spread', 
        component: OwncardsComponent,  
    },
    {
        path: 'library', 
        component: LibraryComponent,  
    }
   
    
];

@NgModule({
    imports: 
    [ RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})

export class AppRoutingModule {}