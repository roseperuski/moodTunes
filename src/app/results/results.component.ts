import { Component, OnInit, Input } from '@angular/core';
import {Music} from '../music';
import {MusicService} from '../music.service';




@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() music: Music;
  // thisMusic: Music[];

  constructor(public musicService : MusicService) { }

  ngOnInit(): void {
  }

}
