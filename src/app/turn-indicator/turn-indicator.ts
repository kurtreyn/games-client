import { Component, Input } from '@angular/core';
import { GlobalResourceMap } from '../resources/global-resource-map';

@Component({
  selector: 'app-turn-indicator',
  imports: [],
  templateUrl: './turn-indicator.html',
  styleUrl: './turn-indicator.scss',
})
export class TurnIndicator {
  public GlobalResourceMap = GlobalResourceMap;
  @Input() isPlayerTurn: boolean = false;
}
