import { Component } from '@angular/core';
import { NoticeMessageEnum } from '../enums/notice-message.enum';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications {
  public noticeMessageEnum = NoticeMessageEnum;
}
