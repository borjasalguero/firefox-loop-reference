/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';
var debug = true;
var _opentokWorking = false;
var _simplewebrtcWorking = false;
var _gumWorking = false;

// OpenTok params
var apiKey = "44981402";
var sessionId = "2_MX40NDk4MTQwMn5-VGh1IFNlcCAxMSAwNzoyOTozOSBQRFQgMjAxNH4wLjYwNzYyNX5-";
var token = "T1==cGFydG5lcl9pZD00NDk4MTQwMiZzaWc9YTc5YzNlODM4MDY3OWZlMGQxMzRhMWRlNTQ1MzhiMjFmZWY1YmQ4NDpyb2xlPW1vZGVyYXRvciZzZXNzaW9uX2lkPTJfTVg0ME5EazRNVFF3TW41LVZHaDFJRk5sY0NBeE1TQXdOem95T1Rvek9TQlFSRlFnTWpBeE5INHdMall3TnpZeU5YNS0mY3JlYXRlX3RpbWU9MTQxMDQ0NTgwOSZub25jZT0wLjY1MDI4MDg0NDM5NTQ1NjQmZXhwaXJlX3RpbWU9MTQxMzAzNzc2Nw==";
var session = null;
var constraints = {
  video: true,
  audio: false
};

// Buttons to start/stop the stream
var _handlerOpentok = null;
var _handlerSimplewebrtc = null;
var _handlerGUM = null;

function _clean() {
  if (_opentokWorking) {
    session.disconnect();
    document.getElementById('video-opentok-container').innerHTML = '<div id="video-opentok"></div>';
  }


  if (_simplewebrtcWorking) {
    document.getElementById('simplewebrtc-opentok-container').innerHTML =
      '<video height="300" id="video-simplewebrtc"></video>' +
      '<div id="video-simplewebrtc-remotes"></div>';
  }

  if (_gumWorking) {
    document.getElementById('video-gum-container').innerHTML = '';
  }

  var videos = document.querySelectorAll('.OT_root');
  for (var i = 0; i < videos.length; i++) {
    videos[i].parentNode.removeChild(videos[i]);
  }

  _opentokWorking = false;
  _simplewebrtcWorking = false;
  _gumWorking = false;
}

function _cancel() {
  _clean();
  window.location.hash = 'menu';
}

window.addEventListener('load', function load() {
  document.getElementById('launch-opentok').addEventListener('click', function() {
    window.location.hash = 'opentok';
  });

  document.getElementById('launch-gum').addEventListener('click', function() {
    window.location.hash = 'gum';
  });

  document.getElementById('launch-simplewebrtc').addEventListener('click', function() {
    window.location.hash = 'simplewebrtc';
  });

  document.getElementById('cancel-opentok').addEventListener('click', function() {
    _cancel();
  });

  document.getElementById('cancel-gum').addEventListener('click', function() {
    _cancel();
  });

  document.getElementById('cancel-simplewebrtc').addEventListener('click', function() {
    _cancel();
  });

  // Init OpenTok library
  Opentok.setConstraints(constraints);
  // Initialize session, set up event listeners, and connect
  OT.setLogLevel(OT.DEBUG);
  session = OT.initSession(
    apiKey,
    sessionId
  );


  _handlerOpentok = document.getElementById('opentok-stream-handler');
  _handlerOpentok.addEventListener('click', function() {
    if (_opentokWorking) {
      session.disconnect();
      _clean();
      _handlerOpentok.textContent = 'Start';
      return;
    }
    _opentokWorking = true;
    _handlerOpentok.textContent = 'Stop';

    session.connect(token, function(error) {
      var publisher = OT.initPublisher();
      publisher = session.publish(
        'video-opentok',
        null,
        function(e) {
          console.log('OpenTok: STREAM PUBLISHED');
        }
      );
    });
  });


  _handlerGUM = document.getElementById('gum-stream-handler');
  _handlerGUM.addEventListener('click', function() {
    if (_gumWorking) {
      _clean();
      _handlerGUM.textContent = 'Start';
      return;
    }
    _gumWorking = true;
    _handlerGUM.textContent = 'Stop';


    navigator.mozGetUserMedia(
      {
        video: true,
        audio: false
      },
      function onStreamReady(stream) {
        var video = document.createElement('video');
        video.muted = true;
        video.mozSrcObject = stream;
        document.getElementById('video-gum-container').appendChild(video);
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );
  });

  _handlerSimplewebrtc = document.getElementById('simplewebrtc-stream-handler');
  _handlerSimplewebrtc.addEventListener('click', function() {
    if (_simplewebrtcWorking) {
      _clean();
      _handlerSimplewebrtc.textContent = 'Start';
      return;
    }
    _simplewebrtcWorking = true;
    _handlerSimplewebrtc.textContent = 'Stop';


    var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'video-simplewebrtc',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'video-simplewebrtc-remotes',
      // immediately ask for camera access
      autoRequestMedia: true
    });


    // we have to wait until it's ready
    webrtc.on('readyToCall', function () {
      // you can name it anything
      webrtc.joinRoom('your awesome room name');
    });
  });
});
