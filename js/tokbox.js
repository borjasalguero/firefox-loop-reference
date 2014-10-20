(function(exports) {

  var _videoContainer = null;
  var _session = null;
  var _apiKey = '45038222';
  var _sessionId = '2_MX40NTAzODIyMn5-MTQxMzg0NDA1MzI1MX5SaVFmTnRZaFBTa2NJNUZFazRWL0RIdUZ-fg';
  var _token = 'T1==cGFydG5lcl9pZD00NTAzODIyMiZzaWc9NzVlNjZlMTM0OWZlMjI2NmZhNDQ0NmY0OTYwNTlhYWNiM2U2Nzg4Nzpyb2xlPW1vZGVyYXRvciZzZXNzaW9uX2lkPTJfTVg0ME5UQXpPREl5TW41LU1UUXhNemcwTkRBMU16STFNWDVTYVZGbVRuUlphRkJUYTJOSk5VWkZhelJXTDBSSWRVWi1mZyZjcmVhdGVfdGltZT0xNDEzODQ0MDgwJm5vbmNlPTAuNjcwODM3MTEyNzY1MzgxOSZleHBpcmVfdGltZT0xNDE2NDM2MDI2';
  var _constraints = {
    video: true,
    audio: true
  };

  function _resetHTML() {
    if (!_videoContainer) {
      return;
    }
    _videoContainer.innerHTML = '<div id="video-opentok"></div>';
  }

  var TokBox = {
    start: function(videoContainer) {
      _videoContainer = videoContainer;
      _resetHTML();
      _session = TB.initSession(_apiKey, _sessionId);

      _session.on({
        streamCreated: function(event) {
          // As we don't have multi party calls yet there will be only one peer.
          var subscriber =
            _session.subscribe(
              event.stream,
              'video-opentok',
              null,
              function onSubscribe(error) {
                if (error) {
                  console.log('OpenTok: ' + error.message);
                } else {
                  console.log('OpenTok: SUBSCRIBED');
                }
            }
          );
          subscriber.on({
            loaded: function() {
              console.log('OpenTok: SUBSCRIBER LOADED');
            }
          });
        }
      });


      _session.connect(_token, function(e) {
        if (e) {
          console.log('OpenTok: ' + e.message)
          return;
        }
        Opentok.setConstraints(_constraints);
        _session.publish(
          'video-opentok',
          null,
          function onPublish(ee) {
            if (ee) {
              console.log('OpenTok: ' + ee.message);
            } else {
              console.log('OpenTok: STREAM PUBLISHED');
            }
          }
        );
      });
    },
    clean: function() {
      _session && _session.disconnect();
      if (_videoContainer) {
        _videoContainer.innerHTML = '';
      }
      _session = null;
    }
  };

  exports.TokBox = TokBox;

})(this);