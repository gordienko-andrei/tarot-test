import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/appScrollAnimation'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TarotService } from '../../services/tarot.service';
import { FormsModule } from '@angular/forms';
import { Card } from '../../interfaces/card.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


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
    BreakpointObserver,
    
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit, AfterViewChecked {
  
  cards: Card[] = [];
  selectedArcanaType: string = 'major';
  selectedElement: string = 'pentacles';
  selectedOption: string = 'major';
  majorArcanaCards: Card[] = [];
  pentaclesCards: Card[] = [];
  cupsCards: Card[] = [];
  swordsCards: Card[] = [];
  wandsCards: Card[] = [];
  selectedCard: Card | null = null;
  isElementSelectEnabled: boolean = false;


  // majorArcanaCards: Card[] = [];
  // pentaclesCards: Card[] = [];
  // cupsCards: Card[] = [];
  // swordsCards: Card[] = [];
  // wandsCards: Card[] = [];
  // selectedCard: Card | null = null;
  isScrolled: boolean = false;
  isSmallScreen: boolean = false;

  constructor(
    private http: HttpClient, 
    private TarotService: TarotService, 
    private breakpointObserver: BreakpointObserver
  ){};

  onCardClick(card: Card): void {
    this.selectedCard = card;
  };

  getColsCount(): number {
    return this.isSmallScreen ? 2 : 3;
  }

  onSelectChange() {
    this.isElementSelectEnabled = this.selectedOption === 'minor';
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });

    this.TarotService.getCards().subscribe( data => {
      this.cards = data.cards;

      this.majorArcanaCards = this.TarotService.getCardsByCategory("major");
      this.pentaclesCards = this.TarotService.getCardsByCategory("pentacles");
      this.cupsCards = this.TarotService.getCardsByCategory("cups");
      this.swordsCards = this.TarotService.getCardsByCategory("swords");
      this.wandsCards = this.TarotService.getCardsByCategory("wands");
    });
  }
  
  ngAfterViewChecked(): void {
    if (!this.isScrolled) {
      window.scrollTo(0, 0); 
      this.isScrolled = true;
    }
  }

  
}

  // search() {
  //   this.http.get('https://tarotapi.dev/api/v1/cards/search?q=' + this.name)
  //   .subscribe((response) => {
  //     this.response = response;
  //     console.log(this.response);
  //   })
  // }

