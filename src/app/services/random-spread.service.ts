import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TarotService } from './tarot.service';
import { Card } from '../interfaces/card.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomSpreadService {
  private newSpreadSource = new BehaviorSubject<Card[]>([]);
  newSpread$ = this.newSpreadSource.asObservable();

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

  public addRandomCardToSpread(): void {
    if (this.newSpreadSource.value.length < 3) {
      this.getRandomCard().subscribe(card => {
        let newCard = { ...card, isRotated: Math.random() >= 0.5 };
        const currentSpread = this.newSpreadSource.value;
  
        if (!currentSpread.some(existingCard => existingCard.name === newCard.name)) {
          this.newSpreadSource.next([...currentSpread, newCard]);
        } else {
          this.addRandomCardToSpread();
        }
      });
    } 
  }
  
  
}
