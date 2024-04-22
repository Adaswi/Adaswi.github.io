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
    .catch(err => alert('Error: ' + err))
};

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var recognition = new SpeechRecognition();
if (SpeechGrammarList) {
  var speechRecognitionList = new SpeechGrammarList();
  var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
}
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "pl";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
function startRecognition() {
  recognition.start();
  document.getElementById("colorSpeech").textContent = "Ready to receive voice command.";
}

recognition.onresult = function (event) {
  var color = event.results[0][0].transcript;
  var newColor = polishCheck(color)
  document.body.style.backgroundColor = newColor;
  document.getElementById("colorSpeech").textContent = color
}

recognition.onspeechend = function () {
  recognition.stop();
}

recognition.onnomatch = function (event) {
  document.getElementById("colorSpeech").textContent = "I didn't recognise that color.";
}

recognition.onerror = function (event) {
  document.getElementById("colorSpeech").textContent = 'Error occurred in recognition: ' + event.error;
}

function polishCheck(color) {
  if (recognition.lang == "pl") {
    switch (color) {
      case "akwamaryna":
        return "aqua"
        break;
      case "czarny":
        return "black"
        break;
      case "czerwony":
        return "red"
        break;
      case "niebieski":
        return "blue"
        break;
      case "karmazynowy":
        return "crimson"
        break;
      case "zielony":
        return "green"
        break;
      case "żółty":
        return "yellow"
        break;
      case "pomarańczowy":
        return "orange"
        break;
      case "brązowy":
        return "brown"
        break;
      case "różowy":
        return "pink"
        break;
      case "biały":
        return "white"
        break;
      case "fioletowy":
        return "purple"
        break;
    }
  }
}