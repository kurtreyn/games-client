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

  // A Subject to multi-cast incoming messages to the component
  private _message$ = new Subject<SocketMessage>();

  constructor() { }

  /**
   * Initializes connection and returns an Observable tracking connection status.
   */
  public connectToServer(): Observable<boolean> {
    this._socket = new WebSocket(`${this._localHost}${this._socketPort}`);

    return new Observable<boolean>(observer => {
      if (!this._socket) return;

      this._socket.onopen = () => {
        console.log('WebSocket connection established');
        observer.next(true);
      };

      this._socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        observer.next(false);
        observer.error(error);
      };

      this._socket.onclose = () => {
        console.log('WebSocket connection closed');
        observer.next(false);
        observer.complete();
      };

      // Handle message parsing directly in the stream setup
      this._socket.onmessage = (event: MessageEvent) => {
        try {
          const rawData = JSON.parse(event.data);
          const incomingMessage: SocketMessage = {
            type: rawData.type,
            text: rawData.text,
            userName: rawData.userName,
            timeStamp: new Date(rawData.timeStamp) // ISO to Date conversion
          };

          this._message$.next(incomingMessage);
        } catch (error) {
          console.error('Parsing error', error);
        }
      };
    });
  }

  /**
   * Exposes the message stream to the component
   */
  public getMessages(): Observable<SocketMessage> {
    return this._message$.asObservable();
  }

  /**
   * Handles sending data to the open socket
   */
  public sendMessage(message: SocketMessage): boolean {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      this._socket.send(JSON.stringify(message));
      console.log('Sent to server:', message);
      return true;
    }
    console.warn('Cannot send message, socket is not open.');
    return false;
  }

  /**
   * Disconnects the socket safely
   */
  public disconnect(): void {
    if (this._socket) {
      this._socket.close();
      this._socket = null;
    }
  }
}