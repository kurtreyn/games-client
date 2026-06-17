import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { ConnectFourApi } from '../../services/connect-four-api';

export type CellState = 'empty' | 'red' | 'yellow';

@Component({
  selector: 'app-connect-four',
  imports: [],
  templateUrl: './connect-four.html',
  styleUrl: './connect-four.scss',
})
export class ConnectFour implements OnInit {
  private _connectFourApi = inject(ConnectFourApi);
  private _destroyRef = inject(DestroyRef);
  private _subs = new Subscription();

  board: CellState[][] = [];

  readonly totalColumns = 7;
  readonly totalRows = 6;

  ngOnInit(): void {
    this.resetBoard();
    this._connectToGameServer();
  }

  private _connectToGameServer(): void {
    this._subs.add(
      this._connectFourApi.connectToServer().pipe(
        takeUntilDestroyed(this._destroyRef)
      ).subscribe({
        next: (connected) => {
          console.log('Connect Four connection status:', connected);
        },
        error: (error) => {
          console.error('Error connecting to Connect Four server:', error);
        }
      })
    );

    this._destroyRef.onDestroy(() => {
      console.log('Connect Four component is being destroyed, cleaning up subscriptions.');
      this._subs.unsubscribe();
    });
  }

  public resetBoard(): void {
    this.board = Array.from({ length: this.totalColumns }, () =>
      Array(this.totalRows).fill('empty')
    );
  }

  // Example event handler for when a user clicks a column
  public handleColumnClick(columnIndex: number): void {
    console.log(`Column ${columnIndex} clicked`);
    // Your move logic goes here...
  }



  /* 
    function playMove(board, player, column, row) {
  // Check values of arguments.
  if (player !== PLAYER1 && player !== PLAYER2) {
    throw new Error(`player must be ${PLAYER1} or ${PLAYER2}.`);
  }
  const columnElement = board.querySelectorAll(".column")[column];
  if (columnElement === undefined) {
    throw new RangeError("column must be between 0 and 6.");
  }
  const cellElement = columnElement.querySelectorAll(".cell")[row];
  if (cellElement === undefined) {
    throw new RangeError("row must be between 0 and 5.");
  }
  // Place checker in cell.
  if (!cellElement.classList.replace("empty", player)) {
    throw new Error("cell must be empty.");
  }
}


function initGame(websocket) {
  websocket.addEventListener("open", () => {
    // Send an "init" event according to who is connecting.
    const params = new URLSearchParams(window.location.search);
    const baseUrl = window.location.origin + window.location.pathname;
    console.log("Initializing game with params:", params.toString());
    console.log("Base URL:", baseUrl);
    let event = { type: "init" };
    if (params.has("join")) {
      // Second player joins an existing game.
      event.join = params.get("join");
    } else if (params.has("watch")) {
      // Spectator watches an existing game.
      event.watch = params.get("watch");
    } else {
      // First player starts a new game.
      console.log("Starting a new game.");
    }
    const jsonFormattedEvent = JSON.stringify(event);
    console.log("Sending event:", jsonFormattedEvent);
    websocket.send(jsonFormattedEvent);
  });
}

function showMessage(message) {
  window.setTimeout(() => window.alert(message), 50);
}

function receiveMoves(board, websocket) {
  websocket.addEventListener("message", ({ data }) => {
    const event = JSON.parse(data);
    console.log("Received event:", event);
    switch (event.type) {
      case "init":
        // Create links for inviting the second player and spectators.
        document.querySelector(".join").href = "?join=" + event.join;
        document.querySelector(".watch").href = "?watch=" + event.watch;
        showMessage(
          `Game initialized! Share this URL with a friend to join: ${window.location.origin + window.location.pathname}?join=${event.join}`,
        );
        break;
      case "play":
        // Update the UI with the move.
        playMove(board, event.player, event.column, event.row);
        break;
      case "win":
        showMessage(`Player ${event.player} wins!`);
        // No further messages are expected; close the WebSocket connection.
        websocket.close(1000);
        break;
      case "error":
        showMessage(event.message);
        break;
      default:
        throw new Error(`Unsupported event type: ${event.type}.`);
    }
  });
}

function sendMoves(board, websocket) {
  // Don't send moves for a spectator watching a game.
  const params = new URLSearchParams(window.location.search);
  if (params.has("watch")) {
    return;
  }

  // When clicking a column, send a "play" event for a move in that column.
  board.addEventListener("click", ({ target }) => {
    const column = target.dataset.column;
    // Ignore clicks outside a column.
    if (column === undefined) {
      return;
    }
    const event = {
      type: "play",
      column: parseInt(column, 10),
    };
    websocket.send(JSON.stringify(event));
  });
}

window.addEventListener("DOMContentLoaded", () => {
  // Initialize the UI.
  const board = document.querySelector(".board");
  createBoard(board);
  // Open the WebSocket connection and register event handlers.
  const websocket = new WebSocket("ws://localhost:8001/");
  initGame(websocket);
  receiveMoves(board, websocket);
  sendMoves(board, websocket);
});
  */
}
