var video, canvas, context, labels, socket, imageSocket, name, loc, my_username;
var imageServer='https://image-copying-server.herokuapp.com/'

window.onload = function(){
    var target='http://localhost:3000'
    my_username=<%- JSON.stringify(user) %>;
    alert(my_username)
    // Grab elements, create settings, etc.
    socket = io.connect(target);
    imageSocket=io.connect(imageServer);
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


    imageSocket.on('done',function(url){
        alert("got it "+url);
    })
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


 $("#save_img_button").on('click',function(){
    function processPosition(position) {
        //let server know
        let pos_str= position.coords.latitude +
        " " + position.coords.longitude;
        let img_desc = $('#image_title_input').val()
        socket.emit('img',{ imgURL: canvas.toDataURL(), name: my_username, loc: pos_str, desc: img_desc} );
        $("#picture_wrapper").css({'display':'none'})
        $("#video_box").css({'display':'block'})

        imageSocket.emit('img',canvas.toDataURL())
    }
    navigator.geolocation.getCurrentPosition(processPosition);
})

   $("#snap").on('click',function(){
        context.drawImage(video, 0, 0, 640, 480);
        $("#picture_wrapper").css({'display':'block'})
        $("#video_box").css({'display':'none'})
    })

