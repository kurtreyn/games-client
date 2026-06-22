import { Component, inject } from '@angular/core';
import { AbstractGames } from '../../directives/abstract-games';
import { RummyApi } from '../../services/rummy-api';
import { Card } from '../../card/card';
import { CardDeckMap, BackOfCardImagePath } from '../../resources/game-resource-map';
import { ICardDeck } from '../../models/card-deck.interface';

@Component({
  selector: 'app-rummy',
  imports: [Card],
  templateUrl: './rummy.html',
  styleUrl: './rummy.scss',
})
export class Rummy extends AbstractGames {
  private _rummyApiService = inject(RummyApi);

  public cardDeck: ICardDeck[] = CardDeckMap;
  public backOfDeckImage: string = BackOfCardImagePath;

}
