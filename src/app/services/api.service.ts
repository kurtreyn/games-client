import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SocketMessage } from '../models/socket.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _socketPort = 8001;
  private _localHost = 'ws://localhost:';
  private _socket: WebSocket | null = null;

  // Change the Subject type to expect your interface instead of a string
  private _messages$ = new Subject<SocketMessage>();

  constructor() { }

  private _initializeWebSocket(): void {
    if (this._socket) return;
    this._socket = new WebSocket(this._localHost + this._socketPort);
  }

  public connectToServer(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this._initializeWebSocket();

      if (!this._socket) {
        observer.error('WebSocket initialization failed');
        return;
      }

      this._socket.onopen = () => {
        observer.next(true);
      };

      this._socket.onmessage = (event: MessageEvent) => {
        try {
          // Parse the incoming JSON string from the server into your object structure
          const parsedMessage: SocketMessage = JSON.parse(event.data);

          // Ensure the timestamp is converted back into a true Date object
          parsedMessage.timestamp = new Date(parsedMessage.timestamp);

          this._messages$.next(parsedMessage);
        } catch (error) {
          console.error('Failed to parse incoming WebSocket message JSON:', error);
        }
      };

      this._socket.onerror = (error) => observer.error(error);

      this._socket.onclose = () => {
        observer.next(false);
        this._socket = null;
      };

      return () => {
        if (this._socket) this._socket.close();
      };
    });
  }

  public getMessages(): Observable<SocketMessage> {
    return this._messages$.asObservable();
  }

  // Update this to accept your object structure
  public sendMessage(message: SocketMessage): void {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      // Serialize the object into a JSON string before sending
      this._socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected.');
    }
  }
}