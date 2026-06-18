export interface IConnectFourInitGameState {
    type: 'init' | 'join' | 'player_joined' | 'move' | 'win' | 'error' | 'reset';
    join: string | null;
    join_url: string | null;
    player_count: number | null;
    text: string | null;
}