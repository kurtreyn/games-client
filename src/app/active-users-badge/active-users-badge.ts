import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-users-badge',
  imports: [],
  templateUrl: './active-users-badge.html',
  styleUrl: './active-users-badge.scss',
})
export class ActiveUsersBadge {
  @Input() label: string = 'Active Users';
  @Input() activeUsersCount: number = 0;

  constructor() { }


}
