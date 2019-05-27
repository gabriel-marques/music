import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  /* array of {
  track : "string",
  artist : "string",
  date : number,
  votes : number,
  myvote : number  
  }*/
  tracks = [];

  constructor() { }

  addTrack(track){
    this.tracks.unshift(track);
    this.tracks[0].myvote = 0;
    this.tracks = [...this.tracks]; // force refresh of view
  }

  getTrackName(track){
    return track.track;
  }

  removeTrack(track){
    // get index of track in global array
    var index = this.tracks.findIndex(t => t.track == track);
    this.tracks.splice(index,1); // delete the track
    this.tracks = [...this.tracks]; // force refresh of view
    
  }
  
  removeAllTracks(){
    this.tracks = [...this.tracks];
  }

  updateVote(track){
    // get index of track in global array
    var index = this.tracks.findIndex(t => t.track == track['track']);
    // set the value of the track in the array
    this.tracks[index].votes = track['votes'];
    
    this.tracks = [...this.tracks]; // force refresh of view
  }

}
