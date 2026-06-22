import { Component } from '@angular/core';
import { GameResourceMap } from '../../resources/game-resource-map';
import { GameCard } from '../../game-card/game-card';
import { AbstractGames } from '../../directives/abstract-games';

/**
 * The Games component serves as the main hub for displaying available games to users. It leverages the AbstractGames directive to manage WebSocket connections and state related to game availability. The component dynamically renders GameCard components based on the provided GameResourceMap, allowing users to easily navigate to their desired game.
 */

@Component({
  selector: 'app-games',
  imports: [GameCard],
  templateUrl: './games.html',
  styleUrls: ['./games.scss'],
})
export class Games extends AbstractGames {
  public gameResourceMap = GameResourceMap;


}
