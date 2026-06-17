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
    this._resetBoard();
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

  private _resetBoard(): void {
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
  */
}
