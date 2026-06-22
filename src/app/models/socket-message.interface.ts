export interface ISocketMessage {
    type: 'chat' | 'notification' | 'user_count';
    text?: string; // The actual message content
    userName?: string;
    count?: number;
    timeStamp: Date;
    games_available?: string[]; // For game lobby updates, if applicable
    join_keys?: string[]; // For game lobby updates, if applicable
}