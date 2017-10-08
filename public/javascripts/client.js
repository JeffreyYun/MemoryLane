var video, canvas, context, labels, socket, name, loc, my_username;


window.onload = function(){
    //for heroku builds
    //var target="https://image-classifier-bot.herokuapp.com/"
    var target='http://localhost:3000'
    my_username='Jennie'
    // Grab elements, create settings, etc.
    socket = io.connect(target);
    video = document.getElementById('video');
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
      width: 640, height: 480  } }).then(function(stream) {
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

    navigator.geolocation.getCurrentPosition(processPosition);

    function processPosition(position) {
        //let server know
        let pos_str = position.coords.latitude +
        " " + position.coords.longitude;
        let img_desc = $('#input:textbox').val()
        socket.emit('img',{ imgURL: canvas.toDataURL(), name: my_username, loc: pos_str, desc: img_desc} );
    }
    $("#picture_wrapper").css({'display':'block'})
    $("#video_box").css({'display':'none'})
});


 $("#save_img_button").on('click',function(){
    function processPosition(position) {
        //let server know
        let pos_str= position.coords.latitude +
        " " + position.coords.longitude;
        socket.emit('img',{ imgURL: canvas.toDataURL(), name: my_username, loc: pos_str } );
        $("#picture_wrapper").css({'display':'none'})
        $("#video_box").css({'display':'block'})
    }
    navigator.geolocation.getCurrentPosition(processPosition);
})

   $("#snap").on('click',function(){
        context.drawImage(video, 0, 0, 640, 480);
        $("#picture_wrapper").css({'display':'block'})
        $("#video_box").css({'display':'none'})
    })


