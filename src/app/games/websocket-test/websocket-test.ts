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

  // Signals for state management
  isConnected = signal(false);
  messages = signal<SocketMessage[]>([]);

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // 1. Monitor WebSocket Connection State
    this._subs.add(
      this.apiService.connectToServer().subscribe({
        next: (status) => this.isConnected.set(status),
        error: (err) => console.error('Connection dropped:', err)
      })
    );

    // 2. Listen for Incoming Chat Messages
    this._subs.add(
      this.apiService.getMessages().subscribe((message: SocketMessage) => {
        this.messages.update(prev => [...prev, message]);
      })
    );
  }

  // Handle message dispatching securely
  onFormSubmit(text: string): void {
    const cleanedText = text.trim();
    if (!cleanedText) return;

    const outgoingMessage: SocketMessage = {
      type: 'chat',
      text: cleanedText,
      timestamp: new Date()
    };

    this.apiService.sendMessage(outgoingMessage);
    this.messages.update(prev => [...prev, outgoingMessage]);
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
