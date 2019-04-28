let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

tracks = [];

io.on('connection', (socket) => {
  console.log('connection');
  // send all tracks on connection
  io.emit('allTracks', tracks);


  socket.on('disconnect', function () {
    console.log('disconnect');
    io.emit('users-changed', { user: socket.nickname, event: 'left' });
  });

  // on track received
  socket.on('add-track', (track) => {
    // add votes to music
    track.votes = 0;
    tracks.unshift(track);
    console.log('add-track : ' + track.track);
    // emit track to everyone, including the sender
    io.emit('new-track', track);
  });

  socket.on('vote', (message) => {

    // look for track to update
    index = tracks.findIndex(t => t.track == message.track);
    if (index != -1) {
      tracks[index].votes = (message.vote == "up") ? tracks[index].votes + 1 : tracks[index].votes - 1;
      if (tracks[index].votes <= -5) {
        tracks.splice(index, 1); // delete the track
        io.emit('deleteSong', message.track);
      } else {
        // send update info to everyone
        io.emit('voteUpdate', { track: message.track, votes: tracks[index].votes });
      }
    }
  });
});

var port = process.env.PORT || 3001;

http.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});