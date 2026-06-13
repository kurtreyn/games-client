export interface SocketMessage {
    type: string; // e.g., 'chat', 'notification', etc.
    text: string; // The actual message content
    timestamp: Date; // When the message was sent
}