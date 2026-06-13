import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-websocket-test',
  imports: [CommonModule],
  templateUrl: './websocket-test.html',
  styleUrls: ['./websocket-test.scss'],
})
export class WebsocketTest implements OnInit {
  isConnected = false;
  messages: { type: string; text: string; timestamp: Date }[] = [];

  ngOnInit() {
    // Initialize WebSocket connection here
  }

  sendMessage(text: string) {
    if (!text) return;
    const message = { type: 'sent', text, timestamp: new Date() };
    this.messages.push(message);
    // Send the message to the server via WebSocket
  }
}
