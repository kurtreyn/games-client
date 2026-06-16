import { Component, OnInit, signal, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { SocketMessage } from '../../models/socket.interface';

/**
 * Using console logs to trace component lifecycle and message flow for debugging purposes. Ensuring that all interactions with the ApiService are logged for visibility into connection status and message handling.
 */



@Component({
  selector: 'app-websocket-test',
  imports: [CommonModule],
  templateUrl: './websocket-test.html',
  styleUrls: ['./websocket-test.scss'],
})

export class WebsocketTest implements OnInit, OnDestroy, AfterViewChecked {
  private _subs = new Subscription();

  // Component manages state via Signals exactly as requested
  public isConnected = signal(false);
  public messages = signal<SocketMessage[]>([]);
  public userName = signal('')

  private _scrollContainerElement!: ElementRef;

  @ViewChild('scrollContainer', { static: false }) set scrollContainer(content: ElementRef) {
    if (content) {
      this._scrollContainerElement = content;
      // Force a scroll immediately when the element mounts to the DOM
      this._executeScroll();
    }
  }

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    console.log('ngOnInit called, invoking ApiService connection...');

    // 1. Listen to connection status and update state signal
    this._subs.add(
      this._apiService.connectToServer().subscribe({
        next: (status) => this.isConnected.set(status),
        error: () => this.isConnected.set(false)
      })
    );

    // 2. Listen for incoming messages and update state signal
    this._subs.add(
      this._apiService.getMessages().subscribe({
        next: (incomingMessage) => {
          console.log('Received sanitized message:', incomingMessage);
          this.messages.update(prev => [...prev, incomingMessage]);
        }
      })
    );
  }

  ngAfterViewChecked(): void {
    this._scrollToBottom();
  }

  ngOnDestroy(): void {
    // Tell service to disconnect and clean up component subscriptions
    this._apiService.disconnect();
    this._subs.unsubscribe();
  }

  private _scrollToBottom(): void {
    const element = this._scrollContainerElement?.nativeElement;
    if (!element) return;

    // Check if user is near the bottom (with a 20px buffer)
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 20;

    // If there are only 1 or 2 messages, force the scroll anyway
    if (atBottom || this.messages().length <= 2) {
      this._executeScroll();
    }
  }

  private _executeScroll(): void {
    setTimeout(() => {
      try {
        const element = this._scrollContainerElement?.nativeElement;
        if (element) {
          element.scrollTop = element.scrollHeight;
        }
      } catch (err) {
        console.error('Error executing scroll:', err);
      }
    }, 0); // setTimeout pushes the scroll execution to the next macro-task layout cycle
  }


  // Handle message dispatching and update local message state
  public onSubmitMessage(text: string): void {
    const cleanedText = text.trim();
    if (!cleanedText) return;

    const outgoingMessage: SocketMessage = {
      type: 'chat',
      text: cleanedText,
      userName: this.userName(),
      timeStamp: new Date()
    };

    // Dispatch via service
    const sentSuccessfully = this._apiService.sendMessage(outgoingMessage);

    // Update local list state if sent (or unconditionally, depending on your preferred UI behavior)
    if (sentSuccessfully) {
      this.messages.update(prev => [...prev, outgoingMessage]);
    }
  }

  public onUserNameSubmit(name: string): void {
    const cleanedName = name.trim();
    if (!cleanedName) return;

    this.userName.set(cleanedName);
  }


}
