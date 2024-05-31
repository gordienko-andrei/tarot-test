import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../interfaces/card.interface';
import { TarotService } from './tarot.service';



@Injectable({
  providedIn: 'root',

})
export class RandomCardService { 

  constructor(private tarotService: TarotService) {}

  public getRandomCard(): Observable<Card> {
    return this.tarotService.getCards().pipe(
      map(cardsData => {
        const cards = cardsData.cards;
        const randomIndex = Math.floor(Math.random() * cards.length);
        return cards[randomIndex];
      })
    );
  }
}

