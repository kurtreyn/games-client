import { IRummyPlayer } from './rummy-player.interface';

export interface IRummyGameState {
    players: IRummyPlayer[];
    currentPlayerId: string;
    cardDeck: string[];
    discardPile: string[];
    isGameOver: boolean;
    winnerId?: string;
}