 
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

  constructor(public musicService:MusicService) { }

  ngOnInit(): void {
        this.musicService.getTracks(); 
  }
  

//   removeFromPlayList(deleteIndex: number) {
//     console.log(deleteIndex);
//     this.musicService.musiclist.splice(deleteIndex, 1);
//     console.log(this.musicService);
//   }

//   selectedMusic(playlistEntry: Music) {
//     console.log('musicArtist:', playlistEntry.artist_display_name);
//     playlistEntry.isShowing = !playlistEntry.isShowing;
//     return playlistEntry.artist_display_name;
//   }

   
}

