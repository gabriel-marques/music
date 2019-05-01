import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  /* array of {
  track : "string",
  date : number,
  votes : number  
  }*/
  tracks = [];

  constructor() { }

  addTrack(track){
    this.tracks.unshift(track);
    this.tracks = [...this.tracks]; // force refresh of view
  }

  removeTrack(track){
    // get index of track in global array
    var index = this.tracks.findIndex(t => t.track == track);
    this.tracks.splice(index,1); // delete the track
    this.tracks = [...this.tracks]; // force refresh of view
  }

  updateVote(track){
    // get index of track in global array
    var index = this.tracks.findIndex(t => t.track == track['track']);
    // set the value of the track in the array
    this.tracks[index].votes = track['votes'];
    
    this.tracks = [...this.tracks]; // force refresh of view
  }

}
