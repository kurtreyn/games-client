export interface SocketMessage {
    type: string; // e.g., 'chat', 'notification', etc.
    text: string; // The actual message content
    userName?: string; // Optional: who sent the message
    timeStamp: Date; // When the message was sent
}