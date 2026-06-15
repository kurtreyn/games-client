import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { SocketMessage } from '../../models/socket.interface';



@Component({
  selector: 'app-websocket-test',
  imports: [CommonModule],
  templateUrl: './websocket-test.html',
  styleUrls: ['./websocket-test.scss'],
})

export class WebsocketTest implements OnInit, OnDestroy {
  private _subs = new Subscription();

  // Component manages state via Signals exactly as requested
  public isConnected = signal(false);
  public messages = signal<SocketMessage[]>([]);
  public userName = signal('')

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    console.log('ngOnInit called, invoking ApiService connection...');

    // 1. Listen to connection status and update state signal
    this._subs.add(
      this._apiService.connectToServer().subscribe({
        next: (status) => this.isConnected.set(status),
        error: () => this.isConnected.set(false)
      })
    );

    // 2. Listen for incoming messages and update state signal
    this._subs.add(
      this._apiService.getMessages().subscribe({
        next: (incomingMessage) => {
          console.log('Received sanitized message:', incomingMessage);
          this.messages.update(prev => [...prev, incomingMessage]);
        }
      })
    );
  }

  // Handle message dispatching and update local message state
  onFormSubmit(text: string): void {
    const cleanedText = text.trim();
    if (!cleanedText) return;

    const outgoingMessage: SocketMessage = {
      type: 'chat',
      text: cleanedText,
      userName: this.userName(),
      timeStamp: new Date()
    };

    // Dispatch via service
    const sentSuccessfully = this._apiService.sendMessage(outgoingMessage);

    // Update local list state if sent (or unconditionally, depending on your preferred UI behavior)
    if (sentSuccessfully) {
      this.messages.update(prev => [...prev, outgoingMessage]);
    }
  }

  onUserNameSubmit(name: string): void {
    const cleanedName = name.trim();
    if (!cleanedName) return;

    this.userName.set(cleanedName);
  }

  ngOnDestroy(): void {
    // Tell service to disconnect and clean up component subscriptions
    this._apiService.disconnect();
    this._subs.unsubscribe();
  }
}
