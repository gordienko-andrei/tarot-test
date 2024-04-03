import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TarotService {

 
  
  // getAllCards(): Observable<any> {
  //   return this.http.get("https://tarotapi.dev/api/v1/cards").pipe(catchError(this.handleError));
      
  // }
  // private handleError(error: any):any {
  //   console.error('An error occured, error')
    
  // }
}
