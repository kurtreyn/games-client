import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractChat } from '../../directives/abstract-chat';
import { ChatApiService } from '../../services/chat-api';
import { ISocketMessage } from '../../models/socket-message.interface';
import { ActiveUsersBadge } from "../../active-users-badge/active-users-badge";

/**
 * Using console logs to trace component lifecycle and message flow for debugging purposes. Ensuring that all interactions with the ApiService are logged for visibility into connection status and message handling.
 */



@Component({
  selector: 'app-chat',
  imports: [CommonModule, ActiveUsersBadge],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
})

export class Chat extends AbstractChat implements AfterViewChecked {
  private _scrollContainerElement!: ElementRef;

  @ViewChild('scrollContainer', { static: false }) set scrollContainer(content: ElementRef) {
    if (content) {
      this._scrollContainerElement = content;
      // Force a scroll immediately when the element mounts to the DOM
      this._executeScroll();
    }
  }

  constructor(_apiService: ChatApiService) {
    super(_apiService);
  }



  ngAfterViewChecked(): void {
    this._scrollToBottom();
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

    const outgoingMessage: ISocketMessage = {
      type: 'chat',
      text: cleanedText,
      userName: this.userName(),
      timeStamp: new Date()
    };

    // Dispatch via service
    const sentSuccessfully = this._chatApiService.sendMessage(outgoingMessage);

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
