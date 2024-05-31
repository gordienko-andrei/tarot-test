import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { NgIf } from '@angular/common';
import { TarotService } from '../../services/tarot.service';
import { RouterModule } from '@angular/router';
import { CardStateServiceService } from '../../services/card-state.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-dailyprediction',
  standalone: true,
  imports: [
    NgIf,
    RouterModule,
    MatCardModule,
  ],
  providers: [
    TarotService,
    
  ],
  templateUrl: './dailyprediction.component.html',
  styleUrl: './dailyprediction.component.scss'
})

export class DailypredictionComponent implements OnInit, OnDestroy {
  selectedCard: Card | null | undefined;
  private subscription: Subscription  = new Subscription();

  constructor(
    private cardStateService: CardStateServiceService, 
    
  ) {}

  

  ngOnInit(): void {
    this.subscription = this.cardStateService.selectedCard$.subscribe(
      (card) => {
        this.selectedCard = card;
      }
    );

    window.scrollTo(0, 0);
  }
  

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
