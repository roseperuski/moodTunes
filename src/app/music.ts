 export interface Music {
   "@attr":{
      artist:string;
    }; 
    track?:Track [];
    moodTracks?:Moodtracks [];
    results?:Results [];
    trackmatches?:any;
    artist?: any;
    
   }
   
   export interface Track {
    name: string;
    url: string;
    artist: string[];
    mbid: string;
  }
  export interface Moodtracks {
    artist?:{
      name:string;
      mbid:string;
      url:string;
    };
    url?: string;
    name?: string;
    image?: string;
    } 

    export interface TrackResults {
      name: string;
      url: string;
      artist: string[];
      mbid: string;
    }
    export interface Results {
      trackmatches:{
       track: TrackResults []}; 
      } 

      export interface Artists {
        topartists: {
          artist : string[];
        }
      }

      export interface Playlist{
        artist_name: string;
        track_name?: string;
        artist_url: string;
        track_url?: string;
      }




