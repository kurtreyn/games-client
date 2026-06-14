export interface SocketMessage {
    type: string; // e.g., 'chat', 'notification', etc.
    text: string; // The actual message content
    username?: string; // Optional: who sent the message
    timestamp: Date; // When the message was sent
}