import { Component, Input } from '@angular/core';
import { IResourceMap } from '../models/resource-map.interface';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
})
export class GameCard {
  @Input({ required: true }) public gameResourceMap!: IResourceMap;

  public onPlayNow(id: string) {
    // Placeholder for play now action, e.g., navigate to game page or open game modal
    alert('This feature is not available yet.');
  }
}