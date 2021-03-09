import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit {
  selectedFilter: string ="";
  constructor(public musicService: MusicService) { }

  ngOnInit(): void {
    //this.musicService.getMusic();
  }

  fetchDataService(){
    this.musicService.getMusic();
  }

  onOptionsSelected(event: any){
    this.selectedFilter=event.target.value;
    console.log(this.selectedFilter);
  }
  

}
