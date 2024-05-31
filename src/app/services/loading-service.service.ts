import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkResourcesLoaded();
      }
    });
  }

  private checkResourcesLoaded() {
    window.onload = () => {
      this.loadingSubject.next(false);
    };
  }

  public startLoading() {
    this.loadingSubject.next(true);
  }

  public stopLoading(): void {
    setTimeout(() => {
      this.loadingSubject.next(false); 
    }, 2500);
  }
}
