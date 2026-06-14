import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SocketMessage } from '../models/socket.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _socketPort = 8001;
  private _localHost = 'ws://localhost:';

  constructor() { }


  public connectToServer(): Observable<WebSocket> {
    const socket = new WebSocket(`${this._localHost}${this._socketPort}`);
    return new Observable(socketObserver => {
      socket.onopen = () => {
        console.log('WebSocket connection established');
        socketObserver.next(socket);
      };
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        socketObserver.error(error);
      };
      socket.onclose = () => {
        console.log('WebSocket connection closed');
        socketObserver.complete();
      };
    });
  }

  // public getMessages(): Observable<SocketMessage> {
  //   return this._messages$.asObservable();
  // }

  // // Update this to accept your object structure
  // public sendMessage(message: SocketMessage): void {
  //   if (this._socket && this._socket.readyState === WebSocket.OPEN) {
  //     // Serialize the object into a JSON string before sending
  //     this._socket.send(JSON.stringify(message));
  //   } else {
  //     console.error('WebSocket is not connected.');
  //   }
  // }
}