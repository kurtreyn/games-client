import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { WebsocketTest } from '../../games/websocket-test/websocket-test';
import { Notifications } from '../../notifications/notifications';
// import { Games } from "../games/games";

@Component({
  selector: 'app-home',
  imports: [WebsocketTest, Notifications],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  private _apiService = inject(ApiService);
  private _destroyRef = inject(DestroyRef);
  public isConnected = this._apiService.isConnectedSignal;



  ngOnInit(): void {
    this._destroyRef.onDestroy(() => {
      this._apiService.disconnect();
    });
  }
}
