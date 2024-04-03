import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/appScrollAnimation'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TarotService } from '../../services/tarot.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    HttpClientModule,
    FormsModule,
    NgIf
  ],
  providers: [
    TarotService,
    HttpClient,
    FormsModule,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  name: string = "";
  response: any = "";

  constructor(private http: HttpClient){}

  search() {
    this.http.get('https://tarotapi.dev/api/v1/cards' + this.name)
    .subscribe((response) => {
      this.response = response;
      console.log(this.response);
    })
  }
}
