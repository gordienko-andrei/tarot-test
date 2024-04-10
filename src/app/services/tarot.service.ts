import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class TarotService {
  private jsonUrl = "assets/cards.json";
  private cards: Card[] = [];

  constructor (private http: HttpClient){};

  public getCards(): Observable<{ cards: Card[] }> {
    return this.http.get<{ cards: Card[] }>(this.jsonUrl).pipe(
      tap(data => {
        this.cards = data.cards;
      })
    );
  }
  

  public getCardsByCategory(category: string){
    return this.cards.filter( card => card.category === category);
  };
 
  
  // getAllCards(): Observable<any> {
  //   return this.http.get("https://tarotapi.dev/api/v1/cards").pipe(catchError(this.handleError));
      
  // }
  // private handleError(error: any):any {
  //   console.error('An error occured, error')
    
  // }
}
