/*! videojs-Background - v0.1.0 - 2015-1-13
 * Copyright (c) 2015 Matthew Harrison-Jones
 * Licensed under the MIT license. */
(function(window, videojs) {
  'use strict';
  var w = window,
      d = document,
      _html = d.getElementsByTagName('html')[0],
      _body = d.getElementsByTagName('body')[0],
      defaults = {
        option: true,
        container: _body,
        autoPlay: true,
        mediaAspect: 16/9,
        mediaType: 'html5',
        volume: 0
      },
      Background;

  /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  Background = function(options) {
    var settings = videojs.util.mergeOptions(defaults, options),
        player = this,
        videoEl = d.getElementById(player.id() + '_' + settings.mediaType + '_api');

      init(player);
      updateSize(settings, player);

      player.volume(settings.volume);

      if (settings.autoPlay) {
        player.play();
      }

      player.on('loadedmetadata', function(data) {

        if (settings.mediaType === 'html5') {
          // use html5 player to get mediaAspect
          settings.mediaAspect = videoEl.videoWidth / videoEl.videoHeight;
        } else {
          // use html5 player to get mediaAspect
          settings.mediaAspect = videoEl.vjs_getProperty('videoWidth') / videoEl.vjs_getProperty('videoHeight');
        }
        updateSize(settings, player);
      });

      window.onresize = function(){
        updateSize(settings, player);
      };
  };

  function init(player) {
    var containerEl = d.getElementById(player.id()),
        wrap = document.createElement('div');
    wrap.setAttribute('class', 'videojs-background-wrap');

    wrap.appendChild(containerEl);
    _body.appendChild(wrap);
  }

  function updateSize(settings, player) {
    var playerId = player.id();

    if (settings.container === _body) {
      _body.style.height = 'auto';
      var newHeight = w.innerHeight > _body.clientHeight ? '100%' : 'auto';
      _body.style.height = _html.style.height = newHeight;
    }

    var containerW = settings.container.innerWidth < w.innerWidth ? settings.container.innerWidth : w.innerWidth,
        containerH = settings.container.innerHeight < w.innerHeight ? settings.container.innerHeight : w.innerHeight,
        containerAspect = containerW / containerH,
        containerEl = d.getElementById(playerId),
        videoEl = d.getElementById(playerId + '_' + settings.mediaType + '_api');

    if (containerAspect < settings.mediaAspect) {
      // taller
      player.width(containerH * settings.mediaAspect);
      player.height(containerH);

      containerEl.style.top = 0 + 'px';
      containerEl.style.left = -(containerH * settings.mediaAspect - containerW )/ 2 + 'px';

      if (settings.mediaType === 'HTML5') {
        videoEl.style.width = (containerH * settings.mediaAspect) + 'px';
        videoEl.style.height = containerH + 'px';
      } else {
        videoEl.style.width = (containerH * settings.mediaAspect) + 'px';
        videoEl.style.height = containerH + 'px';
      }

    } else {
      // wider
      player.width(containerW);
      player.height(containerW / settings.mediaAspect);

      containerEl.style.top = -(containerW / settings.mediaAspect - containerH) / 2 + 'px';
      containerEl.style.left = 0 + 'px';
      containerEl.style.height = containerW / settings.mediaAspect + 'px';

      if (settings.mediaType === 'HTML5') {
        videoEl.style.width = videoEl.parentNode.style.width;
        videoEl.style.height = 'auto';
      } else {
        videoEl.style.width = videoEl.parentNode.style.width;
        videoEl.style.height = containerW / settings.mediaAspect + 'px';
      }
    }

  }

  // register the plugin
  videojs.plugin('Background', Background);
})(window, window.videojs);
