import { Component, Input, inject, computed, input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IResourceMap } from '../models/resource-map.interface';
import { Router } from '@angular/router';
import { IGamesAvailable } from '../models/games.interface';
import { ILobbyGameMatch } from '../models/games.interface';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
})
export class GameCard {
  private _router = inject(Router);
  private _toastr = inject(ToastrService);

  @Input({ required: true }) public gameResourceMap!: IResourceMap;
  public availableGames = input<ILobbyGameMatch[]>([]);
  public availableGamesId = computed(() => {
    return this.availableGames().map(game => game.game);
  });
  public numberOfAvailableGames = computed(() => {
    // Isolate the count to only matches that correspond to THIS specific card's game ID
    return this.availableGames().filter(game => game.game === this.gameResourceMap.id).length;
  });


  private _getJoinKey(): string {
    const match = this.availableGames().find(game => game.game === this.gameResourceMap.id);
    if (!match || !match.join_key) {
      this._toastr.error(`No join key available for ${this.gameResourceMap.title}`);
      return '';
    }
    return match.join_key;
  }

  public onStartNewGame() {
    this._router.navigateByUrl(this.gameResourceMap.link);
  }

  public onJoinGame() {
    const joinKey = this._getJoinKey();
    const baseRoute = this.gameResourceMap.link; // e.g., '/games/connect-four'

    if (baseRoute && joinKey) {
      console.log(`>>> Navigating cleanly to: ${baseRoute} with key: ${joinKey}`);

      this._router.navigate([baseRoute], {
        queryParams: { join: joinKey }
      });
    } else {
      this._toastr.error(`Could not execute game redirection sequence.`);
    }
  }
}