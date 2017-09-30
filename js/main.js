SC.initialize({
  client_id: 'BLIKpIMvNL9As25CHX4l9xXLu7KuU5uF',
});

SC.get('/tracks', {
  user_id: "4440708"
}).then(function(tracks) {
  var jukebox = new Jukebox(tracks);
  console.log(jukebox.playlist);

  document.querySelector('.controls').addEventListener("click", function(e){
    let button = e.target.classList;
    if (button == "fa fa-play"){
      jukebox.play();
    } else if (button == "fa fa-pause") {
      jukebox.pause();
    } else if (button == 'fa fa-forward') {
      jukebox.forward();
    } else if (button == 'fa fa-backward') {
      jukebox.backward();
    }
  })
});

function Jukebox(playlist) {
  this.playlist = playlist;
  this.currentTrack = 0;
}

Jukebox.prototype.play = function(){
  let song = this.playlist[this.currentTrack];

  SC.stream(`/tracks/${song.id}`).then((player) => {
    song.player = player;
    song.player.play();
    song.player.on('finish', () => {
      this.forward();
    })
  });
  this.updateCurrent();
}

Jukebox.prototype.forward = function(){
  this.currentTrack++;
  this.play();
}

Jukebox.prototype.backward = function(){
  this.currentTrack--;
  this.play();
}

Jukebox.prototype.pause = function(){
  let song = this.playlist[this.currentTrack];
  song.player.pause();
}

Jukebox.prototype.updateCurrent = function(){
  let song = this.playlist[this.currentTrack];
  document.querySelector('#artist').innerHTML = song.user.username
  document.querySelector('#title').innerHTML = song.title
  document.querySelector('#art').src = song.artwork_url.replace('-large', '-t500x500');
  document.querySelector('.play-me h6').innerHTML = "ENJOY"
}
