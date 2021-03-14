import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { Music } from '../music';
import { MusicService } from '../music.service';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public music: Music;
  @Input() searchSelect: string;
  
  constructor(public musicService: MusicService) { }
  
  // if (searchSelect==="tag.gettoptracks"){
  //   console.log ("we got the first. ")
  // }

  ngOnInit(): void {
    
  }

  

}
