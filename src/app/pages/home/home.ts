import { Component } from '@angular/core';
import { WebsocketTest } from '../../games/websocket-test/websocket-test';
import { Notifications } from '../../notifications/notifications';
import { Games } from "../games/games";

@Component({
  selector: 'app-home',
  imports: [WebsocketTest, Notifications, Games],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home { }
