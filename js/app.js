/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

var currentLibrary = null;

function _clean() {
  switch(currentLibrary) {
    case 'opentok':
      TokBox.clean();
      break;
    case 'gum':
      Gum.clean();
      break;
    case 'simplewebrtc':
      SimpleWebRTCHandler.clean();
      break;
  }
  currentLibrary = null;
}

function _cancel() {
  _clean();
  window.location.hash = 'menu';
}

function _launch(library) {
  window.location.hash = library;
  currentLibrary = library;
  switch(currentLibrary) {
    case 'opentok':
      TokBox.start(document.getElementById('video-opentok-container'));
      break;
    case 'gum':
      Gum.start(document.getElementById('video-gum-container'));
      break;
    case 'simplewebrtc':
      SimpleWebRTCHandler.start(document.getElementById('video-simplewebrtc-container'));
      break;
  }
}

window.addEventListener('load', function load() {
  document.getElementById('launch-opentok').addEventListener('click', function() {
    _launch('opentok');
  });

  document.getElementById('launch-gum').addEventListener('click', function() {
    _launch('gum');
  });

  document.getElementById('launch-simplewebrtc').addEventListener('click', function() {
    _launch('simplewebrtc');
  });

  document.getElementById('cancel-gum').addEventListener('click', function() {
    _cancel();
  });

  document.getElementById('cancel-simplewebrtc').addEventListener('click', function() {
    _cancel();
  });

  document.getElementById('cancel-opentok').addEventListener('click', function() {
    _cancel();
  });

  window.location.hash = 'menu';
});
