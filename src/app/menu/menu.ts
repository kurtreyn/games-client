import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  constructor(private _router: Router) { }
  // Signal to track menu visibility
  protected readonly isOpen = signal(false);

  public toggleMenu(): void {
    this.isOpen.update(value => !value);
  }

  public closeMenu(): void {
    this.isOpen.set(false);
  }

  public navigateTo(path: string): void {
    this._router.navigate([path]);
    console.log(`Navigating to ${path}`);
    this.closeMenu();
  }
}