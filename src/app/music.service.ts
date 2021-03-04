import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

interface Response {
  results: Music[];
  //page: number;
}
interface Music{
 type?:string;
 name?:string;
 tag_en:string;
}


@Injectable({
  providedIn: 'root'
})
export class MusicService {
  //apiKey = "";
  url = "https://musicovery.com/api/V6";

  constructor(private http: HttpClient) { }
  getMusic(){
    //console.log(type);
    const requestUrl =
      this.url + "/tag.php?&fct=search&type=mood"; // add whatever params you want from here: https://developers.themoviedb.org/3/discover/movie-discover
    console.log('requestURL:',requestUrl);
    this.http.get(requestUrl).subscribe(
      (response: Response) => {
        console.log(response.results);
        //this.movies = response.results;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //getUrlWithAPIKey() {
    //return `${this.url}?api_key=${this.apiKey}&language=en-US`;
    //return `${this.url}?api_key=${this.apiKey}&language=en-US`;
  //}
}
