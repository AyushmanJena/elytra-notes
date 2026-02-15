import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  toggleTheme() {
    const body = document.body;

    if (body.classList.contains('theme-dark')) {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(`theme-${saved}`);
  }
}
