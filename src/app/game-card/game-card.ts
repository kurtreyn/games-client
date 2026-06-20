import { Component, Input, inject } from '@angular/core';
import { IResourceMap } from '../models/resource-map.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
})
export class GameCard {
  private _router = inject(Router);

  @Input({ required: true }) public gameResourceMap!: IResourceMap;

  public onPlayNow() {
    this._router.navigateByUrl(this.gameResourceMap.link);
  }
}