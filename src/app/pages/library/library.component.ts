import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/appScrollAnimation'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TarotService } from '../../services/tarot.service';
import { FormsModule } from '@angular/forms';
import { Card } from '../../interfaces/card.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    HttpClientModule,
    FormsModule,
    NgIf, NgFor,
    MatGridListModule,
    RouterModule,
  ],
  providers: [
    TarotService,
    HttpClient,
    FormsModule,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
  // name: string = "";
  // response: any = "";
  cards: Card[] = [];
  majorArcanaCards: Card[] = [];
  pentaclesCards: Card[] = [];
  cupsCards: Card[] = [];
  swordsCards: Card[] = [];
  wandsCards: Card[] = [];
  selectedCard: Card | null = null;

  constructor(private http: HttpClient, private TarotService: TarotService){};

  onCardClick(card: Card): void {
    this.selectedCard = card;
  }

  ngOnInit(): void {
    this.TarotService.getCards().subscribe( data => {
      this.cards = data.cards;

      this.majorArcanaCards = this.TarotService.getCardsByCategory("major");
      this.pentaclesCards = this.TarotService.getCardsByCategory("pentacles");
      this.cupsCards = this.TarotService.getCardsByCategory("cups");
      this.swordsCards = this.TarotService.getCardsByCategory("swords");
      this.wandsCards = this.TarotService.getCardsByCategory("wands");
    });

  }

}

  // search() {
  //   this.http.get('https://tarotapi.dev/api/v1/cards/search?q=' + this.name)
  //   .subscribe((response) => {
  //     this.response = response;
  //     console.log(this.response);
  //   })
  // }

