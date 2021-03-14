import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatFormFieldControl} from '@angular/material/form-field';
interface SearchBy {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: SearchMusicComponent }   
  ]
})

export class SearchMusicComponent implements OnInit {


  selectedSearch: string;
  
  searches: SearchBy[] = [
    {value: 'tag.gettoptracks', viewValue: 'Tracks by Mood'},
    {value: 'tag.gettopartists', viewValue: 'Artists by Mood'},
    {value: 'artist.gettoptracks', viewValue: 'Artist'},
    {value: 'track.search', viewValue: 'Track'}
  ];
  //selectedSearch=this.searches[0].value;
  
  searchTerm: string;
  //selectedFilter: string ="";
  constructor(public musicService: MusicService) { }

  ngOnInit(): void {
    //this.musicService.getMusic();
  }

  fetchDataService(){
    const term = this.searchTerm;
    console.log("this is the term " + term)
    this.musicService.getMusic(this.selectedSearch, this.searchTerm);
  }

  // onOptionsSelected(event: any){
  //   this.selectedFilter=event.target.value;
  //   console.log(this.selectedFilter);
  // }
  // selectSearch(event: Event) {
  //   this.selectedSearch = (event.target as HTMLSelectElement).value;
  // }
  

}
