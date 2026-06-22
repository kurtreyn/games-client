import { Component, Input } from '@angular/core';
import { ICard } from '../models/card.intercace';


@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() card!: ICard;

  public onCardClick(): void {
    console.log(`Card clicked: ${this.card.value}`);
  }

}
