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
  playlistShow: boolean = false;

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

  addPlaylist(music){
    console.log("add to playlist: ", music);
    if (this.selectedSearch==="tag.gettoptracks"){
      const playList = {
        artist_name: music.name,
        track_name: music.artist.name,
        artist_url: music.artist.url,
        track_url: music.url
      }
      this.musicService.addPlaylist(playList);
    } else if (this.selectedSearch === "tag.gettopartists") {
      const playList = {
        artist_name: music.name,
        track_name: " ",
        artist_url: music.url,
        track_url: " "
      }
      this.musicService.addPlaylist(playList);
    } else if (this.selectedSearch==="track.search"){
      const playList = {
        artist_name: music.name,
        track_name: music.artist,
        artist_url: " ",
        track_url: music.url
      }
      this.musicService.addPlaylist(playList);
    } else {
      const playList = {
        artist_name: music.name,
        track_name: music.artist.name,
        artist_url: music.artist.url,
        track_url: music.url
      }
      this.musicService.addPlaylist(playList);
    }
   
  }

  

}
