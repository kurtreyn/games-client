import { Component, OnInit } from '@angular/core';
import { ResourceMap } from '../../resources/resource-map';

@Component({
  selector: 'app-games',
  imports: [],
  templateUrl: './games.html',
  styleUrl: './games.scss',
})
export class Games implements OnInit {
  public resourceMap = ResourceMap;

  ngOnInit(): void { }
}
