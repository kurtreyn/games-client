import { Component, inject } from '@angular/core';
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
export class Rummy {
  private _rummyApiService = inject(RummyApi);

  public cardDeck: ICardDeck[] = CardDeckMap;
  public backOfDeckImage: string = BackOfCardImagePath;

}
