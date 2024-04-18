import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationDirective } from '../../directives/appScrollAnimation';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    MatCardModule,
    MatSidenavModule,
    NgIf,
    ScrollAnimationDirective,
    RouterModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  
})
export class WelcomeComponent  {
 

};
