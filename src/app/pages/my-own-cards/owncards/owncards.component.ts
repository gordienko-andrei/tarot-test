import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ScrollAnimationDirective } from '../../../directives/appScrollAnimation'; 
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TarotService } from '../../../services/tarot.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Card } from '../../../interfaces/card.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor, NgIf } from '@angular/common';
import { CardStateServiceService } from '../../../services/card-state.service';
import { CategoryService } from '../../../services/category.service';
import { RandomSpreadService } from '../../../services/random-spread.service';
import { RandomCardService } from '../../../services/random-card.service';

@Component({
  selector: 'app-owncards',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    RouterModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    NgIf, NgFor,
    MatGridListModule,
    RouterModule, 
    MatIconModule,
  ],
  providers: [
    TarotService,
    FormsModule,
    BreakpointObserver, 
    RandomSpreadService, 
    RandomCardService,
  ],
  templateUrl: './owncards.component.html',
  styleUrl: './owncards.component.scss'
})


export class OwncardsComponent implements OnInit, AfterViewChecked{
  cards: Card[] = [];
  majorArcanaCards: Card[] = [];
  pentaclesCards: Card[] = [];
  cupsCards: Card[] = [];
  swordsCards: Card[] = [];
  wandsCards: Card[] = [];
  selectedCard: Card | null = null;
  isScrolled: boolean = false;
  isSmallScreen: boolean = false;
  selectedArcanaType: string = 'major';
  selectedElement: string = 'pentacles';
  spread: Card[] = [];
  selectedOption: string = 'major';
  isElementSelectEnabled: boolean = false;
  bottomCard: Card | null = null;
  

  selectedSpreadType: string = 'random';
  currentMode: 'userSelection' | 'randomGeneration' = 'userSelection';


  categories = [
    { id: 'general-predict', value: 'general', label: 'General' },
    { id: 'love-spread', value: 'love', label: 'Love' },
    { id: 'finance-spread', value: 'finance', label: 'Finance' },
    { id: 'health-spread', value: 'health', label: 'Health' },
    { id: 'work-spread', value: 'work', label: 'Work' },
    { id: 'personal_state-spread', value: 'personal_state', label: 'Personal state' },
    { id: 'partner_analysis', value: 'partner_analysis', label: 'Partner analysis' },
  ];

  constructor(
    private cdr: ChangeDetectorRef, 
    private TarotService: TarotService, 
    private breakpointObserver: BreakpointObserver, 
    private cardStateService: CardStateServiceService, 
    private categoryService: CategoryService,
    private randomSpreadService: RandomSpreadService,
    private randomCardService: RandomCardService,

  ){};
  

  onSelectChange() {
    this.isElementSelectEnabled = this.selectedOption === 'minor';
  }

  onCardClick(card: Card): void {
    if (this.spread.length < 3) {
      if (!this.spread.includes(card)) {
        this.spread.push(card);
        this.cdr.detectChanges();
      }
    }else if (this.spread.length === 3 && !this.spread.includes(card)) {
      this.bottomCard = card;
      console.log('Bottom card:', this.bottomCard);
    }
  }

  onAddCardClick():void {
    this.randomSpreadService.addRandomCardToSpread();
  }

  saveSpread(): void {
    this.cardStateService.setSpread(this.spread);
    this.cardStateService.setBottomCard(this.bottomCard);
  }
  

  getColsCount(): number {
    return this.isSmallScreen ? 2 : 3;
  }

  radioColsCount(): number {
    return this.isSmallScreen ? 2 : 3;
  }

  radioRowHeight():string {
    return this.isSmallScreen ? "2:1.2" : "2.5:0.6";
  }

  deleteCard(index: number): void {
    this.spread.splice(index, 1); 
  }

  deleteBottomCard():void {
    this.bottomCard = null;
  }

  resetSpread(): void {
    this.spread.splice(0, 3);
  }

  toggleRotation(card: Card): void {
    card.isRotated = !card.isRotated; 
    this.cardStateService.setSpread(this.spread); 
    console.log(this.spread);

  }

  onCategoryChange(value: string, label: string) {
    this.categoryService.changeCategory(value);
    this.categoryService.changeLabel(label); 
  }

  onSpreadTypeChange(value: string) {
    this.selectedSpreadType = value;
    this.switchMode(value === 'random' ? 'randomGeneration' : 'userSelection');
  }

  switchMode(newMode: 'userSelection' | 'randomGeneration'): void {
    this.currentMode = newMode;
    if (newMode === 'randomGeneration') {
      this.spread = [];
      this.randomSpreadService.newSpread$.subscribe(spread => {
        this.spread = spread;
      });
      
          
    } else {
      this.spread = [];
      this.cardStateService.spread$.subscribe(userSpread => {
        this.spread = userSpread;
      }); 
      this.cardStateService.bottomCard$.subscribe(userBottomCard => {
        this.bottomCard = userBottomCard;
      }); 
    }
  }
  
  // getRandomCard(){
  //   if(this.bottomCard === null){
  //     this.randomCardService.getRandomCard().subscribe({
  //       next: (randomCard: Card) => {
  //         if (!this.spread.includes(randomCard)) {
  //           this.bottomCard = randomCard;
  //           console.log(this.bottomCard);
  //         } else {
  //           this.getRandomCard(); 
  //         }
  //       },
  //       error: error => {
  //         console.error('Произошла ошибка при получении случайной карты', error);
  //       }
  //     });
  //   }
  // }
  



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

    this.randomSpreadService.newSpread$.subscribe(spread => {
      this.spread = spread;
    });

    this.cardStateService.spread$.subscribe(userSpread => {
      this.spread = userSpread;
    });

    this.cardStateService.bottomCard$.subscribe(userBottomCard => {
      this.bottomCard = userBottomCard;
    }); 

    this.randomCardService.getRandomCard().subscribe({
      next: (randomCard: Card) => {
        if (!this.spread.includes(randomCard)) {
          this.bottomCard = randomCard;
        } 
        else {
          this.randomCardService.getRandomCard().subscribe({
            next: (randomCard: Card) => {
              this.bottomCard = randomCard;
            }
          })
        }  
      }
    })
  }

  ngAfterViewChecked(): void {
    if (!this.isScrolled) {
      window.scrollTo(0, 0); 
      this.isScrolled = true;
    }
  }

  

}
