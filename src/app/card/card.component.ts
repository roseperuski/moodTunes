import { Component, OnInit, Input } from '@angular/core';
import { Music } from '../music';
import { MusicService } from '../music.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  selectedSearch: string;

  constructor(public musicService: MusicService) { }
  
  moodTrack: boolean = false;
  showTrack: boolean = false;
  moodArtist: boolean = false;

  ngOnInit(): void {
    this.selectedSearch = this.musicService.getSelectedSearch();
    this.setSearchShow(this.selectedSearch);
  }
 

   
  setSearchShow(search : string){
    search = this.selectedSearch;
    if (search === "tag.gettoptracks"){
      this.moodTrack = true;
    } else if (search === "tag.gettopartists") {
      this.moodArtist = true;
    } else if (search==="track.search"){
      this.showTrack = true;
    } else {
      this.moodTrack = true;
    }

    console.log ("tag:", this.selectedSearch)
  }

}
