(function(exports) {

	var _videoContainer = null;
	var _stream = null;

  var Gum = {
    start: function(videoContainer) {
    	_videoContainer = videoContainer;
			navigator.mozGetUserMedia(
	      {
	        video: true,
	        audio: true
	      },
	      function onStreamReady(stream) {
	      	// Cache the stream to stop it if need it.
	      	_stream = stream;
	      	// Add the element with the stream retrieved from the camera
	        var video = document.createElement('video');
	        video.muted = true;
	        video.mozSrcObject = stream;
	        videoContainer.appendChild(video);
	        video.play();
	      },
	      function(err) {
	        console.log("An error occured! " + err);
	      }
			);
		},
    clean: function() {
    	_stream.stop();
    	_stream = null;
    	_videoContainer.innerHTML = '';
    	_videoContainer = null;
    }
  };

  exports.Gum = Gum;

})(this);