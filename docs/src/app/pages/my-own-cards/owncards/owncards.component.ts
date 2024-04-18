import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../../directives/appScrollAnimation'; 

@Component({
  selector: 'app-owncards',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
  ],
  templateUrl: './owncards.component.html',
  styleUrl: './owncards.component.scss'
})
export class OwncardsComponent {

}
