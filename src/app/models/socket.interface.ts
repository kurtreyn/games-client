export interface SocketMessage {
    type: 'chat' | 'notification';
    text: string; // The actual message content
    userName?: string;
    timeStamp: Date;
}