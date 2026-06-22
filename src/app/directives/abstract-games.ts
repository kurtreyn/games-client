import { Directive } from '@angular/core';
import { OnInit, signal, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GameLobbyApi } from '../services/game-lobby-api';
import { Subscription } from 'rxjs';
import { ISocketMessage } from '../models/socket-message.interface';
import { ILobbyGameMatch } from '../models/games.interface';

@Directive({
  selector: '[appAbstractGames]',
})
export class AbstractGames implements OnInit {
  protected _subs = new Subscription();
  protected _destroyRef = inject(DestroyRef);
  protected _gameLobbyApi = inject(GameLobbyApi);

  public isActiveInLobby = signal(false);
  public transmissions = signal<ISocketMessage[]>([]);
  public userName = signal('');
  public availableGames = signal<ILobbyGameMatch[]>([]);
  public connectFourGameKeys = signal<string[]>([]);


  ngOnInit(): void {
    console.log('ngOnInit called, invoking ApiService connection...');

    // 1. Listen to connection status and update state signal
    this._subs.add(
      this._gameLobbyApi.connectToServer().pipe(
        takeUntilDestroyed(this._destroyRef)
      ).subscribe({
        next: (connected) => {
          console.log('Connection status updated:', connected);
          this.isActiveInLobby.set(connected);
        },
        error: (error) => {
          console.error('Error connecting to server:', error);
          this.isActiveInLobby.set(false);
        }
      })
    );

    // 2. Listen for incoming messages and update state signal
    this._subs.add(
      this._gameLobbyApi.getTransmissions().pipe(
        takeUntilDestroyed(this._destroyRef)
      ).subscribe({
        next: (incomingTransmission) => {
          console.log('Received transmission:', incomingTransmission);

          // Check if the property exists on the websocket message
          if (incomingTransmission.games_available) {
            const gamesList: ILobbyGameMatch[] = incomingTransmission.games_available;
            console.log('Updating available games list:', gamesList);

            // 1. Save the full list to your state signal
            this.availableGames.set(gamesList);

            // 2. Cleanly isolate and pluck out keys for connect_four matches
            const connectFourKeys = gamesList
              .filter(item => item.game === 'connect_four')
              .map(item => item.join_key);

            // 3. Update your keys string array signal
            this.connectFourGameKeys.set(connectFourKeys);
          }

          console.log('** Game keys for Connect Four:', this.connectFourGameKeys());
          this.transmissions.update(prev => [...prev, incomingTransmission]);
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
