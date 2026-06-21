import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ChatApiService } from '../../services/chat-api';
import { Chat } from '../../games/chat/chat';
import { Notifications } from '../../notifications/notifications';

@Component({
  selector: 'app-home',
  imports: [Chat, Notifications],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  private _apiService = inject(ChatApiService);
  private _destroyRef = inject(DestroyRef);
  public isConnected = this._apiService.isConnectedSignal;



  ngOnInit(): void {
    this._destroyRef.onDestroy(() => {
      this._apiService.disconnect();
    });
  }
}
