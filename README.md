# Video.js Background

Full background video for video.js

## Getting Started

Once you've added the plugin script to your page, you can use it with any video:

```html
<style>
  .videojs-background-wrap {
    overflow:hidden;
    position:absolute;
    height:100%;
    width:100%;
    top:0;
    left:0;
    z-index: -998;
  }
</style>
<script src="video.js"></script>
<script src="videojs-background.js"></script>
<script>
  videojs('bg-video').Background();
</script>
```

There's also a [working example](example.html) of the plugin you can check out if you're having trouble.

## Documentation
### Plugin Options

You may pass in an options object to the plugin upon initialization. This
object may contain any of the following properties:

#### container
Type: `String`
Default: 'body'

This specifies the target element for your background video. It defaults to the body for a full background video.

#### autoPlay
Type: `Boolean`
Default: true

This auto-plays the background video. If this is set to false you have to manually trigger the video start.

#### volume
Type: `Double`
Default: 0

This sets the default volume level. The range is 0 - 1.

#### mediaAspect
Type: `Double`
Default: 16 / 9  (1.777777778)

This sets the default video aspect ratio. If using HTML5 media type this will be retrieved automatically.


#### mediaType
Type: `String`
Default: 'html5'

If you are using a custom media type; such as 'youtube'. You will need to set this so the video can be targetted correctly.

### Notes

On some mobile devices (such as iOS), auto playing videos is not allowed. In the event of this the videos 'poster' will be displayed as the full background.

### Installation

You can simply take the JS from `/lib/videojs-background.js` and use as per the `example.html`. Alternatively, you can use the below package managers;

#### Bower
`bower install videojs-background`

## Release History
 - 1.0.0: Production ready
 - 0.1.0: Initial release

## Credits

 - Matthew Harrison-Jones: [@matt_hojo](http://twitter.com/matt_hojo)
 - A massive hat tip goes to [BigVideo.js](https://github.com/dfcb/BigVideo.js) for some of the algorithms for calculating fullscreen.
