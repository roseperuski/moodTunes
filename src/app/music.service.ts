import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Music, Playlist } from './music'
import { Track } from './track'
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';

interface Response {
  toptracks?: Music;
  tracks?: Music;
  results?:Music;
  topartists?: Music;
  //page: number;
}

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  apiKey = "b88d365cdf804155ac40618e402f7ce5";
  //url = "http://localhost:8080/api/V6";
  url="https://ws.audioscrobbler.com/2.0/";
  urlDiscogs="http://localhost:3000/proxy";
  music: any; // Music;
  musicArray: Music [];

  public image: string;

  public apiUrl: string = "http://localhost:3000/api";
  //public apiUrl: string = "/api";
  selectedSearch: string="";

  constructor(private http: HttpClient) { }
  
  getMusicLanding(){
    const requestUrl =  this.url + "?method=chart.gettoptracks&api_key=" + this.apiKey +"&format=json&limit=10"
      this.http.get(requestUrl).subscribe(
      (response: Response) => {
        console.log(response);
        this.music = response.tracks;
        console.log(this.music);
        
        for (let item of this.music.track) {
          this.getImage(item);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getMusic(method?: string, searchString?: string){
    let requestUrl;
    if (method === "artist.gettoptracks"){
      requestUrl = this.url +"?method="+ method +   "&artist=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json&limit=10";
      this.http.get(requestUrl).subscribe(
        (response: Response) => {
          console.log(response);
          this.music = response.toptracks;

          for (let item of this.music.track) {
            this.getImage(item);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (method === "track.search" ) {
      requestUrl = this.url +"?method="+ method + "&track=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json&limit=10";
      this.http.get(requestUrl).subscribe(
        (response: Response) => {
          console.log(response);
          this.music = response.results;
          for (let item of this.music.trackmatches.track) {
            this.getImage(item);
          }
           console.log(this.music.trackmatches);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      requestUrl =
      this.url+"?method=" + method + "&tag=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json&limit=10";
      console.log('requestURL:',requestUrl);
         
      if (method === "tag.gettoptracks"){
        this.http.get(requestUrl).subscribe(
          (response: Response) => {
            console.log(response);
            this.music = response.tracks;
            for (let item of this.music.track) {
              this.getImage(item);
            }
                console.log("tracks result:", this.music);
          },
          (error) => {
            console.error(error);
          }
        );

      } else {
        this.http.get(requestUrl).subscribe(
          (response: Response) => {
            console.log(response);
            this.music = response.topartists.artist;
            console.log("topartist result:", this.music.artist);
            for (let item of this.music) {
              this.getImage(item);
            }
              },
          (error) => {
            console.error(error);
          }
        );
      }
    }
    //console.log(type);
   
    // this.http.get(requestUrl).subscribe(
    //   (response: Response) => {
    //     console.log(response);
    //     this.music = response.toptracks;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  }

  getTracks(): void {
    
    this.musicArray = [];
    // Make an API request to our LastFM API
    // Set the response of that request to our this.music array
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
              const playList = data[key]; // individual track

              // converting the format of the API to the format
              // that we are expecting in our Music interface
              
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

  addPlaylist(playlist: Playlist) {
    this.http.post(this.apiUrl, playlist).subscribe((data) => {
      this.getTracks();
    });
  }
  
  deletePlaylist(id: number) {
    this.http.delete(this.apiUrl + "/"+id).subscribe((data) => {
      this.getTracks();
    });
  }

  setSelectedSearch(tag: string){
    this.selectedSearch=tag;
    console.log(this.selectedSearch);
  }

  getSelectedSearch(){
    console.log("Selected search is " + this.selectedSearch);
    return this.selectedSearch;
  }
  
  getImage(music: Music) {
    let name;
    if (music.name) {
      name = music.name; 
    } else {
      name = music.artist.name;
    }
  const urlDiscogs1 = this.urlDiscogs + "/database/search?q=" + name;
  const urlDiscogs2 = this.urlDiscogs + "/database/search?q=" + name;
  console.log(music.artist);
  
  console.log("this.selectedSearch", this.selectedSearch);

  if (this.selectedSearch === "tag.gettoptracks" || this.selectedSearch === "artist.gettoptracks" || this.selectedSearch === "") {
    this.http.get(urlDiscogs1).subscribe((response: any) => {
      console.log("if tag.gettoptracks, artist.gettoptracks, landing");
      console.log(response);
      music.image = response.results[0].thumb;
      console.log(music.image);
  })} else if (this.selectedSearch === "tag.gettopartists") {
    this.http.get(urlDiscogs2).subscribe((response: any) => {
      console.log("else if tag.gettopartists");
      console.log(response);
      music.image = response.results[0].thumb;
      console.log(music.artist);
      console.log(music.image);
  })} else { 
    this.http.get(urlDiscogs2).subscribe((response: any) => {
      console.log("else track.search");
    console.log(response);
    music.image = response.results[0].thumb;
    console.log(music.artist);
    console.log(music.image);
  })}}
}