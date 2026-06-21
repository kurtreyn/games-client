import { IRummyPlayer } from './rummy-player.interface';

export interface IRummyGameState {
    players: IRummyPlayer[];
    current_player_id: string;
    card_deck: string[];
    discard_pile: string[];
    moves: string[];
    is_over: boolean;
    winner_id?: string;
}