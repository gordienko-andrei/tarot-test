import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../interfaces/card.interface';
import { TarotService } from '../../services/tarot.service';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cardinfo',
  standalone: true,
  imports: [
    NgIf,
    RouterModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [
    TarotService,
    
  ],
  templateUrl: './cardinfo.component.html',
  styleUrl: './cardinfo.component.scss'
})
export class CardinfoComponent implements OnInit {
  selectedCard: Card | null | undefined;

  constructor(private route: ActivatedRoute, private tarotService: TarotService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const cardId = params['id'];
      this.tarotService.getCardById(cardId).subscribe(card => {
        this.selectedCard = card;
      });
    });

    window.scrollTo(0, 0);
  }
}
