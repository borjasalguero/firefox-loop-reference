(function(exports) {

  var _videoContainer = null;
  var _webrtc = null;

  function _resetHTML() {
    if (!_videoContainer) {
      return;
    }
    _videoContainer.innerHTML = '<video height="300" id="video-simplewebrtc"></video>' +
                                '<div id="video-simplewebrtc-remotes"></div>';
  }

  var SimpleWebRTCHandler = {
    start: function(videoContainer) {
      // Cache UI element
      _videoContainer = videoContainer;
      // Reset HTML
      _resetHTML();
      // Start simplewebrtc library
      _webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'video-simplewebrtc',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'video-simplewebrtc-remotes',
        // immediately ask for camera access
        autoRequestMedia: true
      });

      // We have to wait until it's ready
      _webrtc.on('readyToCall', function () {
        // you can name it anything
        _webrtc.joinRoom('Loop reference');
      });
    },
    clean: function() {
      // Stop video and leave room
      _webrtc && _webrtc.stopLocalVideo();
      _webrtc && _webrtc.leaveRoom();
      // Reset vars
      _webrtc = null;
      if (_videoContainer) {
        _videoContainer.innerHTML = '';
      }
      _videoContainer = null;
    }
  };

  exports.SimpleWebRTCHandler = SimpleWebRTCHandler;

})(this);