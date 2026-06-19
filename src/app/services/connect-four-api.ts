import { Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { IConnectFourInitGameState } from '../models/connect-four.interface';
import { EventEnum } from '../enums/game.enum';
import { environment } from '../config/config';

/**
 * Using console logs to trace component lifecycle and message flow for debugging purposes. Ensuring that all interactions with the ApiService are logged for visibility into connection status and message handling.
 */

@Injectable({
    providedIn: 'root'
})
export class ConnectFourApi {
    private _socket: WebSocket | null = null;
    private _isConnected$ = new BehaviorSubject<boolean>(false);
    // A Subject to multi-cast incoming messages to the component
    private _gameState$ = new Subject<any>();

    public isConnectedSignal: Signal<boolean> = toSignal(this._isConnected$, { requireSync: true });
    public activeUsersCount = signal<number>(0);

    constructor() { }

    private _buildUrl(): string {
        const baseUrl = environment.production ? environment.production_api_url : environment.local_api_url;
        return `${baseUrl}${environment.connect_four_endpoint}`;
    }

    /**
     * Initializes connection and returns an Observable tracking connection status.
     */
    public connectToServer(): Observable<boolean> {
        const url = this._buildUrl();
        console.log('Attempting to connect to WebSocket at:', url);
        this._socket = new WebSocket(url);

        return new Observable<boolean>(observer => {
            if (!this._socket) return;

            this._socket.onopen = () => {
                console.log('WebSocket connection established');
                this._isConnected$.next(true);
                observer.next(true);
            };

            this._socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                this._isConnected$.next(false);
                observer.next(false);
                observer.error(error);
            };

            this._socket.onclose = () => {
                console.log('WebSocket connection closed');
                this._isConnected$.next(false);
                observer.next(false);
                observer.complete();
            };

            // Handle message parsing directly in the stream setup
            this._socket.onmessage = (event: MessageEvent) => {
                try {
                    const rawData = JSON.parse(event.data);
                    console.log('Raw message received from server:', rawData);

                    if (rawData.type === EventEnum.INIT || rawData.type === EventEnum.PLAYER_JOINED) {
                        this.activeUsersCount.set(rawData.player_count || 0);
                    }

                    this._gameState$.next(rawData);
                } catch (error) {
                    console.error('Parsing error', error);
                }
            };
        });
    }

    public isConnected(): Observable<boolean> {
        return this._isConnected$.asObservable();
    }

    /**
     * Exposes the game state stream to the component
     */
    public getGameState(): Observable<IConnectFourInitGameState> {
        return this._gameState$.asObservable();
    }

    /**
     * Handles sending data to the open socket
     */
    public sendGameState(gameState: IConnectFourInitGameState): void {
        if (this._socket && this._socket.readyState === WebSocket.OPEN) {
            this._socket.send(JSON.stringify(gameState));
            console.log('Sent to server:', gameState);
            return;
        }
        console.warn('Cannot send message, socket is not open.');
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