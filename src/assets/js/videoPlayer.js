const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const playRange = document.querySelector("#jsPlayRange");
const videoContent = document.querySelector("#jsVideoContent");

let playTimeout;

// view count
const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
};

// Play
function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playTimeout = setInterval(setPlayRange, 1000);
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    clearInterval(playTimeout);
  }
}

function handleKeydown(e) {
  if (e.code === "Space") {
    handlePlayClick();
  }
}

// volume control
function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function showVolume() {
  volumeRange.classList.remove("hidden");
}
function hiddenVolume() {
  volumeRange.classList.add("hidden");
}

// full screen
function exitFullScreen() {
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.addEventListener("click", goFullScreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}

// play time
const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

async function setTotalTime() {
  if (videoPlayer.duration === Infinity) {
    videoPlayer.removeEventListener("ended", handleEnded);
    while (videoPlayer.duration === Infinity) {
      await new Promise(r => setTimeout(r, 100));
      videoPlayer.currentTime = 10000000 * Math.random();
    }
  }
  // if (!isFinite(videoPlayer.duration)) {
  //   const blob = await fetch(videoPlayer.src).then(response => response.blob());
  //   duration = await getBlobDuration(blob);
  // } else {
  //   duration = videoPlayer.duration;
  // }
  videoPlayer.currentTime = 0;
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  playRange.setAttribute("max", videoPlayer.duration);
  videoPlayer.addEventListener("ended", handleEnded);
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// playRange
function handlePlayrange(e) {
  const inputTime = e.target.value;
  videoContent.currentTime = inputTime;
}

function setPlayRange() {
  playRange.value = videoContent.currentTime;
}

function init() {
  videoPlayer.volume = 0.5;
  document.addEventListener("keydown", handleKeydown);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  volumeBtn.addEventListener("mouseover", showVolume);
  volumeRange.addEventListener("mouseover", showVolume);
  volumeBtn.addEventListener("mouseleave", hiddenVolume);
  volumeRange.addEventListener("mouseleave", hiddenVolume);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  //setTotalTime();
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
  playRange.addEventListener("input", handlePlayrange);
}

if (videoContainer) {
  init();
}
