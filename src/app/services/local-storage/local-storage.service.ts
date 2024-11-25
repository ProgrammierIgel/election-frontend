import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  unsetItem(key: string): void {
    localStorage.removeItem(key)
  }

  getItem(key: string): string | null {
    const item = localStorage.getItem(key);
    return item;
  }
}
