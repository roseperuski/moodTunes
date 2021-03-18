import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Music} from './music'
import {Track} from './track'

interface Response {
  toptracks?: Music;
  tracks?: Music;
  results?:Music;
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
  musicArray: Music [];

  //public apiUrl: string = "http://localhost:3000/api";
  public apiUrl: string = "/api";


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

  getTracks(): void {
    
    this.musicArray = [];
    // Make an API request to our Animal Crossings API
    // Set the response of that request to our this.villagers array
    this.http
      .get(this.apiUrl) // calling the API
      .subscribe(
        // subscribing to run our functions when the data returns
        (data) => {
          console.log('myfavorite:',data);
          // this is what happens on success
          // convert object to an array
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              const playList = data[key]; // individual villager

              // converting the format of the API to the format
              // that we are expecting in our Villager interface
              // villager.name = villager.name["name-USen"];

              this.musicArray.push(playList);
              console.log(this.musicArray);
            }
          }
        },
        (error) => {
          // this is what happens on failure
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
