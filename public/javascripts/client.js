var video, canvas, context, labels, socket, name, loc;

window.onload = function(){

    //for heroku builds
    //var target="https://image-classifier-bot.herokuapp.com/"
    var target='http://localhost:3000'
    // Grab elements, create settings, etc.
    socket = io.connect(target);
    video = document.getElementById('video');
    loc = document.getElementById("location");
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    labels = document.getElementsByTagName('label');
    let camera_works=access_video();

    if (!camera_works){
      alert("Video is not supported by this browser/device.");
     }
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
    }
}

function access_video(){
  // Get access to camera
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //lower framerate
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", frameRate: { ideal: 10, max: 15 },
      width: 512, height: 512  } }).then(function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
      });
      return true;
  }
  //no camera :(
  return false;
}

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
      //note this URL changes for every new canvas draw.
      //must be sent every time
      var data = canvas.toDataURL('image/png');
      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
       alert("sending")
       socket.emit('img',canvas.toDataURL());
});


function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition);

}

function showPosition(position) {
    loc.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}