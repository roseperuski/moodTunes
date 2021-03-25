 
import { Component, OnInit,Input } from '@angular/core';
import { Music } from '../music';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
   @Input() public music: Music;
   //musicArray=[];


  constructor(public musicService:MusicService) { }

  ngOnInit(): void {
        this.musicService.getTracks(); 
        //this.musicArray = this.musicService.musicArray;
        }
  

  removeFromPlayList(deleteIndex: number) {
    console.log(deleteIndex);
    this.musicService.deletePlaylist(deleteIndex);
   // this.ngOnInit();
  }

//   selectedMusic(playlistEntry: Music) {
//     console.log('musicArtist:', playlistEntry.artist_display_name);
//     playlistEntry.isShowing = !playlistEntry.isShowing;
//     return playlistEntry.artist_display_name;
//   }

   
}

