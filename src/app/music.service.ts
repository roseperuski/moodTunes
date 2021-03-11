import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Music} from './music'
import {Track} from './track'

interface Response {
  results: Music[];
  //page: number;
}

// interface TrackResponse {
//   songResults: Track[];
// }


//interface Music{
// type?:string;
 ///name?:string;
 //tag_en:string;
//}


@Injectable({
  providedIn: 'root'
})
export class MusicService {
  apiKey = "b88d365cdf804155ac40618e402f7ce5";
  //url = "http://localhost:8080/api/V6";
  url="http://ws.audioscrobbler.com/2.0/";
  music: Music [] = [];

  constructor(private http: HttpClient) { }
  getMusic(method?: string, searchString?: string){
    let requestUrl;
    if (method === "artist.gettoptracks"){
      requestUrl = this.url +"?method="+ method +   "&artist=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
    } else if (method === "track.search" ) {
      requestUrl = this.url +"?method="+ method + "&track=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
    } else {
      requestUrl =
      //this.url + "/tag.php?&fct=search&type=mood"; // add whatever params you want from here: https://developers.themoviedb.org/3/discover/movie-discover
      this.url+"?method=" + method + "&tag=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
      console.log('requestURL:',requestUrl);
    }
    //console.log(type);
   
    this.http.get(requestUrl).subscribe(
      (response: Response) => {
        console.log(response);
        this.music = response.results.toptracks;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // getUrlWithAPIKey() {
    //return `${this.url}?api_key=${this.apiKey}&language=en-US`;
    //return `${this.url}?api_key=${this.apiKey}&language=en-US`;
  //   return `${this.url}?method=${method}?app_key=${this.apiKey}&format=json`;
  // }
}
