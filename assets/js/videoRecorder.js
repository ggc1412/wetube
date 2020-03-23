const recordContainer = document.querySelector("#jsRecordContainer");
const recordBtn = document.querySelector("#jsRecordBtn");
const videoPreview = document.querySelector("#jsVideoPreview");

let streamObj;
let videoRecorder;

function saveData(e) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(e.data);
  link.download = "recorded.mp4";
  link.click();
}

function startRecording() {
  videoRecorder = new MediaRecorder(streamObj);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", saveData);
}

function stopRecording() {
  videoRecorder.stop();
  videoPreview.srcObject = null;
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "🎥 Start Recording";
}

async function getVideo() {
  try {
    streamObj = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
      mineType: "video/mp4",
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000
    });
    videoPreview.srcObject = streamObj;
    videoPreview.muted = true;
    videoPreview.play();
    startRecording();
    recordBtn.innerHTML = "📌 Stop recording";
    recordBtn.addEventListener("click", stopRecording);
  } catch (error) {
    recordBtn.innerHTML = "😐 Cant record video.";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
}

function init() {
  console.log("init");
  recordBtn.addEventListener("click", getVideo);
}

if (recordContainer) {
  init();
}
