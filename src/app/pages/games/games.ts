import { Component, OnInit } from '@angular/core';
import { GameResourceMap } from '../../resources/game-resource-map';
import { GameCard } from '../../game-card/game-card';

@Component({
  selector: 'app-games',
  imports: [GameCard],
  templateUrl: './games.html',
  styleUrl: './games.scss',
})
export class Games implements OnInit {
  public gameResourceMap = GameResourceMap;

  ngOnInit(): void { }


}
