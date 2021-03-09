import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

interface Music{
  //id?:string;
  //title?:string;
  //artist_display_name?:string;
  //artists?:[];
  //releasedate?:string;
  //genre?:string;
  //arousal?:number;
  //valence?:number;
  //popularity?:string;
  //favorite?:string;
  //isShowing: boolean;
 //name?:string;
 //tag_en:string;
 }

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
 


  constructor(public musicService:MusicService) { }

  ngOnInit(): void {
  }

  

   
}


