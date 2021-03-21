import { Component, Input, OnInit } from '@angular/core';
import { Music } from '../music';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {


  constructor(public musicService: MusicService) { }

  ngOnInit(): void {
  }

}
