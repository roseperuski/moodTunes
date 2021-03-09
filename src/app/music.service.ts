import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Music} from './music'

interface Response {
  results: Music[];
  //page: number;
}


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

  constructor(private http: HttpClient) { }
  getMusic(method?: string, searchString?: string){
    //console.log(type);
    const requestUrl =
      //this.url + "/tag.php?&fct=search&type=mood"; // add whatever params you want from here: https://developers.themoviedb.org/3/discover/movie-discover
      this.url+"?method=tag.gettoptracks&tag=sad&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
      console.log('requestURL:',requestUrl);
    this.http.get(requestUrl).subscribe(
      (response: Response) => {
        console.log(response);
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
