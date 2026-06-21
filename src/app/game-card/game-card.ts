import { Component, Input, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IResourceMap } from '../models/resource-map.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
})
export class GameCard {
  private _toastr = inject(ToastrService);
  private _router = inject(Router);

  @Input({ required: true }) public gameResourceMap!: IResourceMap;

  public onStartNewGame(id: string) {
    switch (id) {
      case 'rummy':
        this._toastr.warning(`This game is not available yet.`);
        break;
      case 'connect_four':
        const route = this.gameResourceMap.link;
        if (route) {
          this._router.navigateByUrl(route);
        } else {
          this._toastr.error(`Route for Connect Four not found.`);
        }
        break;
      default:
        this._toastr.error(`Unknown game ID: ${id}`);
    }
  }

  public onJoinGame(id: string, joinKey?: string) {
    switch (id) {
      case 'rummy':
        this._toastr.warning(`This game is not available yet.`);
        break;
      case 'connect_four':
        const route = this.gameResourceMap.link + (joinKey ? `/${joinKey}` : '');
        if (route) {
          this._router.navigateByUrl(route);
        } else {
          this._toastr.error(`Route for Connect Four not found.`);
        }
        break;
      default:
        this._toastr.error(`Unknown game ID: ${id}`);
    }
  }
}