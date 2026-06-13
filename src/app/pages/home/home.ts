import { Component } from '@angular/core';
import { WebsocketTest } from '../../games/websocket-test/websocket-test';

@Component({
  selector: 'app-home',
  imports: [WebsocketTest],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home { }
