import { Directive } from '@angular/core';
import { OnInit, signal, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { SocketMessage } from '../models/socket.interface';

/**
 * AbstractChat serves as a base directive for chat-related components, providing common functionality and structure. It can be extended by specific chat implementations to ensure consistency and reuse of shared logic across different chat components.
 */

@Directive({
  selector: '[appAbstractChat]',
})
export class AbstractChat implements OnInit {
  protected _subs = new Subscription();

  public isConnected = signal(false);
  public messages = signal<SocketMessage[]>([]);
  public userName = signal('Kurt');

  private _destroyRef = inject(DestroyRef);

  constructor(protected _apiService: ApiService) { }



  ngOnInit(): void {
    console.log('ngOnInit called, invoking ApiService connection...');

    // 1. Listen to connection status and update state signal
    this._subs.add(
      this._apiService.connectToServer().pipe(
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
      this._apiService.getMessages().pipe(
        takeUntilDestroyed(this._destroyRef)
      ).subscribe({
        next: (incomingMessage) => {
          console.log('Received sanitized message:', incomingMessage);
          this.messages.update(prev => [...prev, incomingMessage]);
        }
      })
    );

    this._destroyRef.onDestroy(() => {
      console.log('Component is being destroyed, disconnecting from server and cleaning up subscriptions.');
      this._apiService.disconnect();
      this._subs.unsubscribe();
    });
  }
}
