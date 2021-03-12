 export interface Music {
    track?:Track [];
    //name?: string;
    //track_mbid?: string;
    "@attr":{
      artist:string;
    };
    //artist_mbid: string;
    //image?: string;
  //   id?:string;
  //   title?:string;
  //   artist_display_name?:string;
  //   artists?:[];
  //   releasedate?:string;
  //   genre?:string;
  //   arousal?:number;
  //   valence?:number;
  //   popularity?:string;
  //   favorite?:string;
  //  //name?:string;
   //tag_en:string;
   }
   export interface Track {
    name: string;
    url: string;
    artist: string[];
    image: string;
  }
  // export interface Toptracks {
  //   attr:{
  //     artist:string;
  //   };
  //   // url: string;
  //   // artist: string[];
  //   // image: string;
  // } 
