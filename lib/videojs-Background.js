(function(window, videojs) {
  'use strict';
  var w = window,
      d = document,
      _html = d.getElementsByTagName('html')[0],
      _body = d.getElementsByTagName('body')[0],
      defaults = {
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
    var settings = videojs.mergeOptions(defaults, options),
        player = this,
        videoEl = d.getElementById(player.id() + '_' + settings.mediaType + '_api');

      if(settings.container !== _body && 'string' === typeof settings.container ) {
        settings.container = d.getElementById(settings.container);
      }

      init(settings, player);
      updateSize(settings, player);

      player.volume(settings.volume);

      if (settings.autoPlay) {
        player.play();
      }

      player.on('loadedmetadata', function(data) {

        if (settings.mediaType === 'html5') {
          // use html5 player to get mediaAspect
          settings.mediaAspect = videoEl.videoWidth / videoEl.videoHeight;
        } else if(videoEl.vjs_getProperty !== undefined) {
          // use html5 player to get mediaAspect
          settings.mediaAspect = videoEl.vjs_getProperty('videoWidth') / videoEl.vjs_getProperty('videoHeight');
        }
        updateSize(settings, player);
      });

      var oldResize = window.onresize;
      window.onresize = function(){
        updateSize(settings, player);
        if (typeof oldResize === 'function') {
          oldResize();
        }
      };
  };

  function init(settings, player) {
    var containerEl = d.getElementById(player.id()),
        wrap = document.createElement('div');
    wrap.setAttribute('class', 'videojs-background-wrap');

    wrap.appendChild(containerEl);
    settings.container.appendChild(wrap);

    var style = document.createElement('style');
    var def = ' ' +
      '.videojs-background-wrap .video-js.vjs-controls-disabled .vjs-poster { position: absolute; top: 0; left:0; width: 100%; height: 100%; background-size: 100%!important; background-size: cover!important; display: block!important; }' +
      '.videojs-background-wrap .video-js.vjs-has-started .vjs-poster, .videojs-background-wrap .vjs-youtube .vjs-loading-spinner { display: none!important; }';

    style.setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(style);

    if(style.styleSheet) {
      style.styleSheet.cssText = def;
    } else {
      style.appendChild(document.createTextNode(def));
    }
  }

  function updateSize(settings, player) {
    var playerId = player.id();

    if (settings.container === _body) {
      _body.style.height = 'auto';
      var newHeight = w.innerHeight > _body.clientHeight ? '100%' : 'auto';
      _body.style.height = _html.style.height = newHeight;
    }
    var containerW = settings.container.clientWidth < w.innerWidth ? settings.container.clientWidth : w.innerWidth,
        containerH = settings.container.clientHeight < w.innerHeight ? settings.container.clientHeight : w.innerHeight,
        containerAspect = containerW / containerH,
        containerEl = d.getElementById(playerId),
        videoEl = d.getElementById(playerId + '_' + settings.mediaType + '_api');

    if (containerAspect < settings.mediaAspect) {
      // taller
      player.width(containerH * settings.mediaAspect);
      player.height(containerH);

      containerEl.style.top = 0 + 'px';
      containerEl.style.left = -(containerH * settings.mediaAspect - containerW )/ 2 + 'px';

      videoEl.style.width = (containerH * settings.mediaAspect) + 'px';
      videoEl.style.height = containerH + 'px';

    } else {
      // wider
      player.width(containerW);
      player.height(containerW / settings.mediaAspect);

      containerEl.style.top = -(containerW / settings.mediaAspect - containerH) / 2 + 'px';
      containerEl.style.left = 0 + 'px';
      containerEl.style.height = containerW / settings.mediaAspect + 'px';

      if (settings.mediaType === 'html5') {
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
