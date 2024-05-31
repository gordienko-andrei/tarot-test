import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingServiceService } from './services/loading-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LoadingServiceService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Vision';
  isLoading$ = this.loadingService.loading$;
  loadingPhrase: string = "";
  loadingPhrasesArr: string[] = [
    'Shuffling the cards',
    'Charging the deck with positivity',
    'Reading the cosmic energies',
    'Drawing the cards of fate',
    'Unlocking hidden wisdom',
    'Stirring the cosmic cauldron',
    'Tuning into the astral radio',
    'Making wishes to the stars', 
    'Assembling the puzzles of destiny',
    'Journeying across astral bridges',
    'Listening to the secret whispers of the wind',
    'Unveiling doors to alternate dimensions',
    'Guiding fate with the right answers',
    'Weaving my own tapestry of fate'
  ]

  constructor(private loadingService: LoadingServiceService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.startLoading();
      }
      else if (event instanceof NavigationEnd) {
        this.loadingService.stopLoading();
      }
    })
  }

  ngOnInit() {
    this.loadingChangePhrase();
  }

  loadingChangePhrase() {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.loadingPhrasesArr.length);
      this.loadingPhrase = this.loadingPhrasesArr[randomIndex];
    }, 3000); 
  }


  
}
