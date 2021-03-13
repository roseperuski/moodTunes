import { Component, OnInit } from '@angular/core';
import { Music } from '../music';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public musicService: MusicService) { }
  
  ngOnInit(): void {
    this.musicService.getMusicLanding();
  }

}
