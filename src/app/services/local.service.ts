import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() { }

  // Сохранение данных в localStorage
  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }


  // Получение данных из localStorage
  public getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Удаление данных из localStorage
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  // Очистка всех данных в localStorage
  public clearData() {
    localStorage.clear();
  }

  // Сохранение текущей даты в localStorage
  public saveSessionDate() {
    const currentDate = new Date();
    localStorage.setItem('sessionDate', currentDate.toISOString());
  }

  // Получение даты предыдущей сессии из localStorage
  public getSessionDate(): Date | null {
    const savedDate = localStorage.getItem('sessionDate');
    return savedDate ? new Date(savedDate) : null;
  }
}
