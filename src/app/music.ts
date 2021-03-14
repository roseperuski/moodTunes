export interface Music {
  '@attr'?: {
    artist: string;
  };
  track?: Track[];
  moodTracks?: Moodtracks[];
  artist?: Moodartists[];
}
export interface Track {
  name: string;
  url: string;
  artist: string[];
  image: string;
}
export interface Moodtracks {
  artist?: {
    name: string;
    mbid: string;
    url: string;
  };
  url?: string;
  name?: string;
  image?: string;
}

export interface Moodartists {
  '@attr:': {
    tag: string;
  };
  artist: {
    name: string;
    url: string;
    mbid: string;
  };
}
