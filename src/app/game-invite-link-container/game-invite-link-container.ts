import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-invite-link-container',
  imports: [],
  templateUrl: './game-invite-link-container.html',
  styleUrl: './game-invite-link-container.scss',
})
export class GameInviteLinkContainer {
  @Input() inviteLink: string = '';

  public copyInviteLink(): void {
    if (!this.inviteLink) {
      console.warn('No invite link to copy');
      return;
    }

    navigator.clipboard.writeText(this.inviteLink).then(() => {
      console.log('Invite link copied to clipboard:', this.inviteLink);
    }).catch(err => {
      console.error('Failed to copy invite link:', err);
    });
  }
}
