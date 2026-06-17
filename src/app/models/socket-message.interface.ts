export interface ISocketMessage {
    type: 'chat' | 'notification' | 'user_count';
    text?: string; // The actual message content
    userName?: string;
    count?: number;
    timeStamp: Date;
}