import { Directive } from '@angular/core';
import { OnInit, signal, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GameLobbyApi } from '../services/game-lobby-api';
import { Subscription } from 'rxjs';
import { ISocketMessage } from '../models/socket-message.interface';

@Directive({
  selector: '[appAbstractGames]',
})
export class AbstractGames implements OnInit {
  protected _subs = new Subscription();
  protected _destroyRef = inject(DestroyRef);
  protected _gameLobbyApi = inject(GameLobbyApi);

  public isConnected = signal(false);
  public transmissions = signal<ISocketMessage[]>([]);
  public userName = signal('');


  ngOnInit(): void {
    console.log('ngOnInit called, invoking ApiService connection...');

    // 1. Listen to connection status and update state signal
    this._subs.add(
      this._gameLobbyApi.connectToServer().pipe(
        takeUntilDestroyed(this._destroyRef)
      ).subscribe({
        next: (connected) => {
          console.log('Connection status updated:', connected);
          this.isConnected.set(connected);
        },
        error: (error) => {
          console.error('Error connecting to server:', error);
          this.isConnected.set(false);
        }
      })
    );

    // 2. Listen for incoming messages and update state signal
    this._subs.add(
      this._gameLobbyApi.getTransmissions().pipe(
        takeUntilDestroyed(this._destroyRef)
      ).subscribe({
        next: (incomingMessage) => {
          this.transmissions.update(prev => [...prev, incomingMessage]);
        }
      })
    );

    this._destroyRef.onDestroy(() => {
      console.log('Component is being destroyed, disconnecting from server and cleaning up subscriptions.');
      this._gameLobbyApi.disconnect();
      this._subs.unsubscribe();
    });
  }
}
