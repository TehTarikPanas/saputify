// Select all the elements in the HTML page
// and assign them to a variable
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
  {
    name: "Menerima Luka",
    artist: "Natasya Sabella",
    path: "assets/music/NATASYA SABELLA - MENERIMA LUKA (OFFICIAL LYRICS VIDEO).mp3",
  },
  {
    name: "On The Floor ft. Pitbull 4",
    artist: "Jennifer Lopez",
    path: "assets/music/Jennifer Lopez - On The Floor ft. Pitbull 4.mp3",
  },
  {
    name: "Dream",
    artist: "LISA",
    path: "assets/music/LISA - Dream (Lyric Video) 4.mp3",
  },
  {
    name: "Love Me",
    artist: "RealestK",
    path: "assets/music/RealestK - Love Me (Official Audio) 4.mp3",
  },
  {
    name: "Heaven And Back",
    artist: "Chase Atlantic",
    path: "assets/music/Chase Atlantic - HEAVEN AND BACK 4.mp3",
  },
  {
    name: "DDD",
    artist: "EXID",
    path: "assets/music/[EXID(이엑스아이디)] 덜덜덜(DDD) 뮤직 비디오 (Official Music Video) 4.mp3",
  },
  {
    name: "Cause I'm God Girl",
    artist: "HyunA",
    path: "assets/music/[MV] HyunA(현아) _ Cause I'm God Girl(잘나가서 그래) (Feat. 정일훈 Of BTOB).mp3",
  },
  {
    name: "Lip & Hip",
    artist: "HyunA",
    path: "assets/music/[MV] HyunA(현아) _ Lip & Hip 4.mp3",
  },
  {
    name: "Crazy",
    artist: "4MINUTE",
    path: "assets/music/4MINUTE - 미쳐(Crazy) 4.mp3",
  },
  {
    name: "Lovesick Girls",
    artist: "BLACKPINK",
    path: "assets/music/BLACKPINK - 'Lovesick Girls' M_V 4.mp3",
  },
  {
    name: "Oh!GG",
    artist: "Girls' Generation",
    path: "assets/music/Girls' Generation-Oh!GG 소녀시대-Oh!GG '몰랐니 (Lil' Touch)' MV.mp3",
  },
  {
    name: "Nunu Nana",
    artist: "Jessi",
    path: "assets/music/Jessi (제시) - '눈누난나 (NUNU NANA)' MV 4.mp3",
  },
  {
    name: "Play (Feat. 창모 (Changmo))",
    artist: "CHUNG HA",
    path: "assets/music/청하 (CHUNG HA) - 'PLAY (Feat. 창모 (CHANGMO))' M_V.mp3",
  },
  {
    name: "Flower Shower",
    artist: "HyunA",
    path: "assets/music/현아 _ FLOWER SHOWER _ 가사 _ HyunA _ FLOWER SHOWER _ 스페셜클립 _ Special Clip _ LYRICS.mp3",
  },
  {
    name: "For the Night",
    artist: "Conor Maynard",
    path: "assets/music/Conor Maynard - For the Night (Lyrics) 4.mp3",
  },
  {
    name: "Never Enough",
    artist: "Loren Allred",
    path: "assets/music/Loren Allred - NEVER ENOUGH (LYRIC VIDEO) [The Greatest Showman Soundtrack] 4.mp3",
  },
  {
    name: "Starting Over Again",
    artist: "Natalie Cole",
    path: "assets/music/Starting Over Again.mp3",
  },
  {
    name: "SO BAD",
    artist: "STAYC",
    path: "assets/music/STAYC(스테이씨) 'SO BAD' MV 4.mp3",
  },
  {
    name: "PIRI",
    artist: "Dreamcatcher",
    path: "assets/music/Dreamcatcher (드림캐쳐) 'PIRI' (피리) MV.mp3",
  },
  {
    name: "Percuma",
    artist: "Mahalini",
    path: "assets/music/Percuma - Mahalini _ Lyrics _ Lirik.mp3",
  }
];

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Update details of the track
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
}

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;

  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;

  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60,
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60,
    );

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Render playlist
function renderPlaylist() {
  const playlist = document.getElementById("playlist");
  playlist.innerHTML = "";
  track_list.forEach((track, index) => {
    let li = document.createElement("li");
    // li.textContent = `${track.name} - ${track.artist}`;
    li.innerHTML = `
      <span class="song-name" title="${track.name}">${track.name}</span>
      <span class="song-artist" title="${track.artist}">${track.artist}</span>
    `;
    li.onclick = () => loadTrack(index);
    playlist.appendChild(li);
  });
}

// Search function
// document.getElementById("searchBar").addEventListener("input", function (e) {
//   const query = e.target.value.toLowerCase();
//   const playlist = document.getElementById("playlist");
//   playlist.innerHTML = "";
//   track_list
//     .filter(
//       (track) =>
//         track.name.toLowerCase().includes(query) ||
//         track.artist.toLowerCase().includes(query),
//     )
//     .forEach((track, index) => {
//       let li = document.createElement("li");
//       li.textContent = `${track.name} - ${track.artist}`;
//       li.onclick = () => loadTrack(index);
//       playlist.appendChild(li);
//     });
// });

document.getElementById("searchBar").addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  const playlist = document.getElementById("playlist");
  playlist.innerHTML = "";

  track_list
    .filter(
      (track) =>
        track.name.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query)
    )
    .forEach((track) => {
      let li = document.createElement("li");
      li.textContent = `${track.name} - ${track.artist}`;

      // Store the original index of the track in a data attribute
      li.dataset.index = track_list.indexOf(track);

      // Use the stored index when clicked
      li.onclick = (e) => {
        const idx = parseInt(e.target.dataset.index, 10);
        loadTrack(idx);
        playTrack(); // auto-play after selecting
      };

      playlist.appendChild(li);
    });
});


// Initialize playlist
renderPlaylist();

// Load the first track in the tracklist
loadTrack(track_index);
