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

  public onPlayNow(id: string) {

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
      case 'chess':
        this._toastr.warning(`This game is not available yet.`);
        break;
      default:
        this._toastr.error(`Unknown game ID: ${id}`);
    }

  }
}