import { Component, OnInit, Input } from '@angular/core';
import { Music } from '../music';
import { MusicService } from '../music.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public music: Music;
  @Input() selectedSearch: string;
  constructor(public musicService: MusicService) { }
  
  

  ngOnInit(): void {
    this.musicService.getSelectedSearch();
    
  }
 
  addPlaylist(music: Music){

  this.musicService.getTracks(); 
  }
   

}
