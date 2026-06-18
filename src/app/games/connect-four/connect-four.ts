import { Component, inject, OnInit, DestroyRef, input, effect, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ConnectFourApi } from '../../services/connect-four-api';
import { ConnectFourCellState, EventEnum } from '../../enums/game.enum';
import { ActiveUsersBadge } from '../../active-users-badge/active-users-badge'
import { GameInviteLinkContainer } from '../../game-invite-link-container/game-invite-link-container';
import { IConnectFourInitGameState } from '../../models/connect-four.interface';

@Component({
  selector: 'app-connect-four',
  imports: [ActiveUsersBadge, GameInviteLinkContainer],
  templateUrl: './connect-four.html',
  styleUrl: './connect-four.scss',
})
export class ConnectFour implements OnInit {
  private _cdr = inject(ChangeDetectorRef);
  private _connectFourApi = inject(ConnectFourApi);
  private _toastr = inject(ToastrService);
  private _destroyRef = inject(DestroyRef);
  private _subs = new Subscription();

  public board: ConnectFourCellState[][] = [];
  public activeUsersCount = this._connectFourApi.activeUsersCount;
  public badgeLabel = 'Players in Game';
  public inviteLink: string = window.location.href;
  public joinKey = input<string | null>(null, { alias: 'join' });

  public readonly totalColumns = 7;
  public readonly totalRows = 6;

  constructor() {
    effect(() => {
      const joinValue = this.joinKey();
      console.log('Join key from URL parameters:', joinValue);
    });
  }

  ngOnInit(): void {
    this._resetBoard();
    this._connectToGameServer();
    this._subscribeToGameState();
  }

  private _connectToGameServer(): void {
    this._subs.add(
      this._connectFourApi.connectToServer().pipe(
        takeUntilDestroyed(this._destroyRef)
      ).subscribe({
        next: (connected) => {
          console.log('Connect Four connection status:', connected);
          if (connected) {
            const key = this.joinKey();
            if (key) {
              console.log('Joining existing game with key:', key);
              this._connectFourApi.sendGameState({ type: EventEnum.JOIN, join: key });
            } else {
              console.log('No join key provided, waiting for a player to start a new game.');
            }
          }
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

  private _subscribeToGameState(): void {
    this._subs.add(
      this._connectFourApi.getGameState().pipe(
        takeUntilDestroyed(this._destroyRef)
      ).subscribe({
        next: (gameState) => {
          console.log('Received game state update:', gameState);

          switch (gameState.type) {
            case EventEnum.INIT:
              this.inviteLink = `${window.location.origin}${window.location.pathname}?join=${gameState.join}`;
              break;
            case EventEnum.PLAYER_JOINED:
              this._toastr.success(`A new player has joined the game!`);
              break;
            case EventEnum.MOVE:
              this._updateBoard(gameState);
              break;
            case EventEnum.WIN:
              this._toastr.success(`Player ${gameState.winner} wins!`);
              break;
            case EventEnum.ERROR:
              this._toastr.error(gameState.text || 'An error occurred in the game.');
              break;
            default:
              console.warn('Something went wrong', gameState.type);
          }



          // Update the board state based on the received game state
          if (gameState.board) {
            this.board = gameState.board;
          }
        },
        error: (error) => {
          console.error('Error receiving game state updates:', error);
          this._toastr.warning(`This game is not available yet.`);
        }
      })
    );
  }



  public startGame() {
    console.log('Start Game button clicked');
    this._connectFourApi.sendGameState({ type: EventEnum.INIT });
  }

  private _updateBoard(gameState: any): void {
    console.log('Updating board with new game state:', gameState);
    // { type: 'move', player: 'red', column: 6, row: 0 }
    if (gameState.column !== undefined && gameState.row !== undefined && gameState.player) {
      const { column, row, player } = gameState;
      const updatedColumn = [...this.board[column]];
      updatedColumn[row] = player === 'red' ? ConnectFourCellState.RED : ConnectFourCellState.YELLOW;

      const newBoardSnapshot = [...this.board];
      newBoardSnapshot[column] = updatedColumn;

      this.board = newBoardSnapshot;
      this._cdr.markForCheck(); // Ensure the view updates with the new board state
    }
  }

  private _resetBoard(): void {
    this.board = Array.from({ length: this.totalColumns }, () =>
      Array(this.totalRows).fill(ConnectFourCellState.EMPTY)
    );
  }


  // Example event handler for when a user clicks a column
  public playMove(columnIndex: number): void {
    this._connectFourApi.sendGameState({ type: EventEnum.MOVE, column: columnIndex });
  }
}
