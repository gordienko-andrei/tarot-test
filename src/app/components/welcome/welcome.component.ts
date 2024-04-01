import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { trigger, style, transition, animate} from '@angular/animations';
import { ScrollAnimationDirective } from '../../directives/appScrollAnimation';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    MatCardModule,
    MatSidenavModule,
    NgIf,
    ScrollAnimationDirective,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  
})
export class WelcomeComponent  {
 

};
