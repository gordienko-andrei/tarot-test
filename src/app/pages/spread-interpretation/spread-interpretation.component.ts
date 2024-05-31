import { Component, OnInit } from '@angular/core';
import { CardStateServiceService } from '../../services/card-state.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { Card } from '../../interfaces/card.interface';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { blockScalingDirective } from '../../directives/blockScaling';
import { RandomCardService } from '../../services/random-card.service';
import { TarotService } from '../../services/tarot.service';
import { deckRotationDirective } from '../../directives/deckRotation';


@Component({
  selector: 'app-spread-interpretation',
  standalone: true,
  imports: [
    MatGridListModule,
    NgFor, NgIf,
    RouterModule,
    MatCardModule,
    blockScalingDirective,
    HttpClientModule,
    deckRotationDirective
  ],
  providers: [
    RandomCardService,
    TarotService,
  ],
  templateUrl: './spread-interpretation.component.html',
  styleUrl: './spread-interpretation.component.scss'
})
export class SpreadInterpretationComponent implements OnInit {
  spread: Card[] = []; 
  category: string = " ";
  label: string = " ";
  isSmallScreen: boolean = false;
  bottomCard: Card | null = null;
  majorCardsCounter: number = 0;
  minorCardsCounter: number = 0;
  cardRatio: string = "";
  pentaclesCounter: number = 0;
  cupsCounter: number = 0;
  swordsCounter: number = 0;
  wandsCounter: number = 0;
  cardsRatioByMinorCategory: string = "";
  allSuitsDifferent: number = 0;

  
  
  constructor(
    private cardStateService: CardStateServiceService,
    private categoryService: CategoryService,
    private breakpointObserver: BreakpointObserver, 
  ) {}

  mainCardsInSpreadByCategory(): string {
    for (let object of this.spread) {
      object.category === "major" ? this.majorCardsCounter++ : this.minorCardsCounter++;
    }
    if (this.majorCardsCounter > this.minorCardsCounter) {
      this.cardRatio = "Your tarot spread is dominated by Major Arcana cards, this could mean that you are currently experiencing life-changing events or significant lessons that are shaping your journey. These cards often reflect deep personal transformations or powerful external forces at play in your life.";
    } else if (this.majorCardsCounter < this.minorCardsCounter) {
      this.cardRatio = "The Minor Arcana cards prevail in your spread, it indicates that the daily decisions and practical aspects of life are at the forefront. These cards are connected to the routine matters and can shed light on how your immediate environment or small choices are influencing you.";
    } else {
      this.cardRatio = "Your spread has an equal number of Major and Minor Arcana cards, it suggests a balance between the profound life changes and the everyday affairs. It’s a reminder that both the grand and the mundane are weaving the fabric of your current situation.";
    }
    return this.cardRatio || "No cards in spread.";
  }
  
  mainCardsInSpreadByMinorCategory(): string {
    for (let object of this.spread) {
      switch(object.category) {
        case "pentacles":
          this.pentaclesCounter++;
        break;
        case "cups":
          this.cupsCounter++;
        break;
        case "swords":
          this.swordsCounter++;
        break;
        case "wands":
          this.wandsCounter++;
        break;   
      }
    }
    if( this.pentaclesCounter >= Math.round(this.spread.length / 2) ){
      return this.cardsRatioByMinorCategory = "In your spread, the Pentacles are predominant, pointing to material and financial aspects. It signifies a time to concentrate on practicalities and work towards tangible results.";
    } 
    else  if( this.cupsCounter >= Math.round(this.spread.length / 2) ){
      return this.cardsRatioByMinorCategory = "In your spread, the Cups are predominant, indicating that emotional matters and relationships are at the forefront. It suggests a time to reflect on your feelings and connections with others.";
    } 
    else  if( this.swordsCounter >= Math.round(this.spread.length / 2) ){
      return this.cardsRatioByMinorCategory = "In your spread, the Swords are predominant, suggesting a period of challenges or mental activity. It may be a time for decision-making or navigating through conflicts using intellect and communication.";
    }
    else  if( this.wandsCounter >= Math.round(this.spread.length / 2) ){
      return this.cardsRatioByMinorCategory = "In your spread, the Wands are predominant, which means there is a focus on action and initiative. This could relate to your career or personal projects that require energy and determination.";
    }
    else if (this.majorCardsCounter >= Math.round(this.spread.length / 2)) {
      return this.cardsRatioByMinorCategory = "In your spread, the Major Arcana cards are predominant, signifying major life events or lessons. These themes are likely playing a significant role in your life journey right now.";
    } else {
      this.cardsRatioByMinorCategory = "When All Cards in Your Spread Are Different: A Tapestry of Influence. This situation weaves together a rich tapestry of influences, each thread representing a distinct aspect of your life. Let’s explore the suits and their meanings: Wands: These fiery symbols embody motivation, energy, and inspiration—the very essence of your soul’s desires. They encourage you to take action, ignite your passions, and pursue creative endeavors. Pentacles: Grounded and practical, Pentacles speak of career, work, and financial matters. They remind you to tend to the material aspects of life—building stability, managing resources, and nurturing growth. Swords: Sharp and cerebral, Swords represent intellect, communication, and truth. They cut through illusions, urging you to engage in honest conversations, make informed decisions, and navigate mental challenges. Cups: The emotional reservoirs of your heart, Cups overflow with feelings, relationships, and connections. They invite you to explore love, empathy, and vulnerability—to cherish the bonds that shape your existence. Now, consider how these themes intersect in your life: Balancing Act: Are you gracefully balancing practical concerns (Pentacles) with emotional needs (Cups)? Imagine the delicate equilibrium between work and love, logic and intuition. Seek harmony in this dance. Intellectual Quests: Perhaps you’re navigating intellectual challenges (Swords) while seeking inspiration (Wands). The clash of mind and spirit can lead to breakthroughs. Embrace the tension—it fuels growth. And then, the Major Arcana card emerges—a beacon of significance. It signifies major life events or profound lessons. Reflect on its message. What transformation awaits? What truths lie hidden? Trust that these themes are pivotal on your life journey.";
    }
    const onlyMajorArcana = this.spread.every(card => card.category === "major");
    
    
    if (onlyMajorArcana || this.allSuitsDifferent) {
      if (this.allSuitsDifferent === 3) {
        return this.cardsRatioByMinorCategory = "This situation suggests a diverse range of influences or aspects in your life. Each suit represents a different area. Wands: Motivation, energy, inspiration, and matters of the soul. Pentacles: Career, work, finances, and practical matters. Swords: Intellect, conversation, truth, and matters of the mind. Cups: Emotions, feelings, relationships, and matters of the heart. Consider how these themes intersect in your life. Are you balancing practical concerns (Pentacles) with emotional needs (Cups)? Or perhaps you’re navigating intellectual challenges (Swords) while seeking inspiration (Wands). In such cases, you might want to reflect on how these diverse energies play out in your situation. It’s an opportunity to integrate different aspects of your life and find harmony.";
      }
      else {
        return this.cardsRatioByMinorCategory = "In your spread, the Major Arcana cards are predominant, signifying major life events or lessons. These themes are likely playing a significant role in your life journey right now.";
      }
      
    }
    return this.cardsRatioByMinorCategory || "In your spread, the Major Arcana cards are predominant, signifying major life events or lessons. These themes are likely playing a significant role in your life journey right now.";

   
  }


 

  clearSpread() {
    this.spread = [];
  }

  radioRowHeight():string {
    return this.isSmallScreen ? "1:2" : "1:1";
  }

  goBack(): void {
    this.cardStateService.clearSpread(); 
    this.cardStateService.clearBottomCard(); 
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });

    
    this.cardStateService.spread$.subscribe(
      (newSpread) => {
        this.spread = newSpread; 
      }
    );

    this.cardStateService.bottomCard$.subscribe(
      (newBottomCard) => {
        this.bottomCard = newBottomCard; 
      }
    );


    this.categoryService.currentCategory.subscribe(category => {
      this.category = category;
    });
    this.categoryService.currentLabel.subscribe(label => {
      this.label = label;
    });

    this.mainCardsInSpreadByCategory();
    this.mainCardsInSpreadByMinorCategory();
    
    
    window.scrollTo(0, 0);
   
  }

  
}
