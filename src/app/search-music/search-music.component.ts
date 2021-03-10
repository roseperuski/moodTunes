import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';


@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})

export class SearchMusicComponent implements OnInit {
  searchTerm: string;
  selectedFilter: string ="";
  constructor(public musicService: MusicService) { }

  ngOnInit(): void {
    //this.musicService.getMusic();
  }

  fetchDataService(){
    const term = this.searchTerm;
    console.log("this is the term " + term)
    this.musicService.getMusic(this.selectedFilter, this.searchTerm);
  }

  onOptionsSelected(event: any){
    this.selectedFilter=event.target.value;
    console.log(this.selectedFilter);
  }
  

}
