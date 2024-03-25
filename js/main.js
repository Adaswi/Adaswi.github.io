const PATH = 'service-worker.js';
        let message = 'ALERT'
        let isServiceWorkersSupport = ('serviceWorker' in navigator);
        if (isServiceWorkersSupport) {
         console.log('Will service worker register?');
         navigator.serviceWorker.register(PATH).then(function () {
         console.log("Yes it did.");
         }).catch(function (err) {
         console.log("No it didn't. This happened: ", err)
         });
        }
        
        alert(message);

        window.addEventListener("load", (event) => {
                const statusDisplay = document.getElementById("status");
                statusDisplay.textContent = navigator.onLine ? "Online" : "OFFline";
              });

        window.addEventListener("offline", (event) => {
                const statusDisplay = document.getElementById("status");
                statusDisplay.textContent = "Offline";
              });
              
              window.addEventListener("online", (event) => {
                const statusDisplay = document.getElementById("status");
                statusDisplay.textContent = "Online";
              });
              function getUserMedia(options, successCallback, failureCallback) {
                var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia || navigator.msGetUserMedia;
                if (api) {
                  return api.bind(navigator)(options, successCallback, failureCallback);
                }
              }
              
              var theStream;
              
              function getStream() {
                if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
                  !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
                  alert('User Media API not supported.');
                  return;
                }
                
                var constraints = {
                  video: true
                };
              
                getUserMedia(constraints, function (stream) {
                  var mediaControl = document.querySelector('video');
                  if ('srcObject' in mediaControl) {
                    mediaControl.srcObject = stream;
                  } else if (navigator.mozGetUserMedia) {
                    mediaControl.mozSrcObject = stream;
                  } else {
                    mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
                  }
                  theStream = stream;
                }, function (err) {
                  alert('Error: ' + err);
                });
              }
              
              function takePhoto() {
                if (!('ImageCapture' in window)) {
                  alert('ImageCapture is not available');
                  return;
                }
                
                if (!theStream) {
                  alert('Grab the video stream first!');
                  return;
                }
                
                var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
              
                theImageCapturer.takePhoto()
                  .then(blob => {
                    var theImageTag = document.getElementById("imageTag");
                    theImageTag.src = URL.createObjectURL(blob);
                  })
                  .catch(err => alert('Error: ' + err))};