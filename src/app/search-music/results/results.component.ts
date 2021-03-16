import { Component, Input, OnInit } from '@angular/core';
import { Music } from '../../music';
import { MusicService } from '../../music.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit { 
  @Input() public music: Music;
  @Input() selectedSearch: string;

  displayArtistName: boolean = false;

  constructor(public musicService: MusicService) { }

  ngOnInit(): void {
    this.displayArtist(this.musicService.getSelectedSearch());
  }

  displayArtist(tag: string){
    if(tag==="artist.gettoptracks"){
      this.displayArtistName=true;
      console.log(this.displayArtistName);
    }
  }

}
