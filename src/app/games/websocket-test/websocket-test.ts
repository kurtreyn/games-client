import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ApiService } from '../../services/api.service';
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
  private _socket: WebSocket | null = null;
  private _socketPort = 8001;
  private _localHost = 'ws://127.0.0.1:';

  // Signals for state management
  public isConnected = signal(false);
  public messages = signal<SocketMessage[]>([]);

  constructor
    (
    // private _apiService: ApiService

  ) { }

  ngOnInit(): void {
    console.log('ngOnInit called, attempting to connect to WebSocket server...');
    // 1. Set up WebSocket connection
    this._socket = new WebSocket(`${this._localHost}${this._socketPort}`);

    // 2. Handle Connection Open and Close Events
    this._socket.onopen = () => {
      console.log('WebSocket connection established');
      this.isConnected.set(true);
    };

    this._socket.onclose = () => {
      console.log('WebSocket connection closed');
      this.isConnected.set(false);
    };

    this._socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.isConnected.set(false);
    };

    // 3. Listen for Incoming Chat Messages
    this._socket.onmessage = (event: MessageEvent) => {
      try {
        const rawData = JSON.parse(event.data);

        const incomingMessage: SocketMessage = {
          type: rawData.type,
          text: rawData.text,
          // CRITICAL: Convert the incoming JSON ISO string back into a real Date object
          timestamp: new Date(rawData.timestamp)
        };

        console.log('Received sanitized message:', incomingMessage);
        this.messages.update(prev => [...prev, incomingMessage]);
      } catch (error) {
        console.error('Parsing error', error);
      }
    };


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

    // Send over the active socket connection
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      this._socket.send(JSON.stringify(outgoingMessage));
      console.log('Sent to server:', outgoingMessage);
    }

    // Update the UI locally inside Angular's zone

    this.messages.update(prev => [...prev, outgoingMessage]);

  }

  ngOnDestroy(): void {
    this._socket?.close();
    this._subs.unsubscribe();
  }
}
