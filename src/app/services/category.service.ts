import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categorySource = new BehaviorSubject<string>("general");
  private LabelSource = new BehaviorSubject<string>("General");
  currentCategory = this.categorySource.asObservable();
  currentLabel = this.LabelSource.asObservable();

  constructor() { }

  changeCategory(category: string) {
    this.categorySource.next(category);
  }
  changeLabel(label: string) {
    this.LabelSource.next(label);
  }
}
