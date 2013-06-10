ImageLoader
===========

Plain-old callback when all images in HTML page are loaded, with custom timeout

Why?
====

I'm developing a HTML5 game and although there are many ways to track image
loading, they mostly use XHR which does not work reliably in different
browsers. I don't care about progress bars, but I do compose images after
loading (using EaselJS cache) and need to make sure images are loaded before
caching.

How to use?
===========

The usage is really simple. In case some of the images fail to load, or takes
too long, you could have a problem that program would not go on, and user won't
see anything. To avoid this, I added a custom timeout, after which the callback
would be called regardless. The timeout resets after each successfull download,
so don't set it too high. The example below uses 12 seconds:

// 1. create image loader
var imageLoader = new ImageLoader(12);

// 2. feed it some URLs
imageLoader.add('shadow', "http://mycnd.com/shadow.jpg");
imageLoader.add('ball',   "http://mycnd.com/ball.png");
imageLoader.add('player', "http://mycnd.com/player.png");

// 3. wait for load to complete and then do something with the images
imageLoader.loadAll(function() {

    // do something, like for example:
    var ballSprite = new createjs.Bitmap(imageLoader.get('ball'));

});

