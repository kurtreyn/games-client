import { EventEnum, ConnectFourCellState } from '../enums/game.enum';

export interface IConnectFourInitGameState {
    type: EventEnum;
    join?: string;
    join_url?: string;
    player_count?: number;
    text?: string;
    player?: 'red' | 'yellow';
    column?: number;
    row?: number;
    winner?: 'red' | 'yellow';
    board?: ConnectFourCellState[][];
    reset?: EventEnum.RESET;
}