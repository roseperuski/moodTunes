import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Music} from './music'
import {Track} from './track'

interface Response {
  toptracks?: Music;
  tracks?: Music;
  results?: Music;
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
  music: Music;
  selectedSearch="";
  constructor(private http: HttpClient) { }
  
  getMusicLanding(){
    const requestUrl =  this.url + "?method=chart.gettoptracks&api_key=" + this.apiKey +"&format=json"
    this.http.get(requestUrl).subscribe(
      (response: Response) => {
        console.log(response);
        this.music = response.tracks;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getMusic(method?: string, searchString?: string){
    let requestUrl;
    if (method === "artist.gettoptracks"){
      requestUrl = this.url +"?method="+ method +   "&artist=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
      this.http.get(requestUrl).subscribe(
        (response: Response) => {
          console.log(response);
          this.music = response.toptracks;
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (method === "track.search" ) {
      requestUrl = this.url +"?method="+ method + "&track=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
      this.http.get(requestUrl).subscribe(
        (response: Response) => {
          console.log(response);
          this.music = response.results;
          console.log(this.music.trackmatches);

        },
        (error) => {
          console.error(error);
        }
      );
      
    } else {
      requestUrl =
      this.url+"?method=" + method + "&tag=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
      console.log('requestURL:',requestUrl);
         
      if (method === "tag.gettoptracks"){
        this.http.get(requestUrl).subscribe(
          (response: Response) => {
            console.log(response);
            this.music = response.tracks;
          },
          (error) => {
            console.error(error);
          }
        );

      }
    }
    //console.log(type);
   
    this.http.get(requestUrl).subscribe(
      (response: Response) => {
        console.log(response);
        this.music = response.toptracks;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setSelectedSearch(tag: string){
    this.selectedSearch=tag;
  }

  getSelectedSearch(){
    console.log("Selected search is " + this.selectedSearch);
    return this.selectedSearch;

  }
  // getUrlWithAPIKey() {
    //return `${this.url}?api_key=${this.apiKey}&language=en-US`;
    //return `${this.url}?api_key=${this.apiKey}&language=en-US`;
  //   return `${this.url}?method=${method}?app_key=${this.apiKey}&format=json`;
  // }
}
