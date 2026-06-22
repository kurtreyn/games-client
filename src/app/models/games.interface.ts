export interface ILobbyGameMatch {
    game: string;
    join_key: string;
}

export interface IGamesAvailable {
    games_available: ILobbyGameMatch[];
}