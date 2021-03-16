 
// import { Component, OnInit } from '@angular/core';
// import { MusicService } from '../music.service';

// interface Music{
//   //id?:string;
//   //title?:string;
//   //artist_display_name?:string;
//   //artists?:[];
//   //releasedate?:string;
//   //genre?:string;
//   //arousal?:number;
//   //valence?:number;
//   //popularity?:string;
//   //favorite?:string;
//   isShowing: boolean;
//  //name?:string;
//  //tag_en:string;
//  }

// @Component({
//   selector: 'app-playlists',
//   templateUrl: './playlists.component.html',
//   styleUrls: ['./playlists.component.css']
// })
// export class PlaylistsComponent implements OnInit {
 
//   isShowing = false;
//   @Input() music;

//   constructor(public musicService:MusicService) { }

//   ngOnInit(): void {
//   }

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

   
// }

