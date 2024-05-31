import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardStateServiceService {
  private selectedCardSource = new BehaviorSubject<Card | null>(null);
  selectedCard$ = this.selectedCardSource.asObservable();
  private spreadSource = new BehaviorSubject<Card[]>([]);
  spread$ = this.spreadSource.asObservable();
  private bottomCardSource = new BehaviorSubject<Card | null>(null);
  bottomCard$ = this.bottomCardSource.asObservable();

  public setSelectedCard(card: Card): void {
    this.selectedCardSource.next(card);
  }
  
  public getSelectedCard(): Card | null {
    return this.selectedCardSource.getValue();
  }

  public setSpread(spread: Card[]): void {
    this.spreadSource.next(spread);
  }

  public setBottomCard(bottomCard: Card | null): void {
    this.bottomCardSource.next(bottomCard);
  }

  public clearSpread(): void {
    this.spreadSource.next([]); 
  }
  public clearBottomCard(): void {
    this.bottomCardSource.next(null); 
  }
}
