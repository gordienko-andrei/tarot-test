import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationDirective } from '../../directives/appScrollAnimation';
import { RandomCardService } from '../../services/random-card.service';
import { TarotService } from '../../services/tarot.service';
import { Card } from '../../interfaces/card.interface';
import { CardStateServiceService } from '../../services/card-state.service';
import { PortalScrollAnimationDirective } from '../../directives/portalScrollAnimation';
import { matBgAnimationDirective } from '../../directives/matBgAnimation';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    MatCardModule,
    MatSidenavModule,
    NgIf,
    ScrollAnimationDirective,
    RouterModule,
    PortalScrollAnimationDirective,
    matBgAnimationDirective
  ],
  providers: [
    TarotService,
    RandomCardService,
    LocalService
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit {
  card: Card | null = null;
  currentDate = new Date();
  currentDay = this.currentDate.getDate();
  
  constructor(
    private randomCardService: RandomCardService,
    private tarotService: TarotService,
    private cardStateService: CardStateServiceService,
    private localService: LocalService
  ) {}
  
  ngOnInit(): void {
    const savedDate = this.localService.getSessionDate();
    const currentDate = new Date();
    let needNewCard = true;

    if (savedDate) {
      const savedDay = new Date(savedDate).setHours(0, 0, 0, 0);
      const currentDay = currentDate.setHours(0, 0, 0, 0);
      needNewCard = currentDay > savedDay;
    }

    if (needNewCard) {
      this.getRandomCard();
    } 
    else {
      const savedCard = this.localService.getData("Card");
      this.card = savedCard ? JSON.parse(savedCard) : null;
    }
  }

  getRandomCard() {
    this.randomCardService.getRandomCard().subscribe({
      next: (randomCard: Card) => {
        this.card = randomCard;
        this.localService.saveData("Card", this.card);
        this.localService.saveSessionDate();
        this.cardStateService.setSelectedCard(this.card);
      },
      error: error => {
        console.error('Произошла ошибка при получении случайной карты', error);
      }
    });
  }

  onCardClick(card: Card): void {
    this.cardStateService.setSelectedCard(card);
  }
}

