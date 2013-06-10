/*
  Copyright (c) 2013 Milan Babuskov. This code is released under MIT license:

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

function ImageLoader(timeout)
{
    var self = this;
    self.loaded = 0;
    self.callback = null;
    self.images = {};
    self.imageCount = 0;
    self.timeout = setTimeout(function() { self.timeIsOut(); }, timeout*1000);

    this.add = function(name, path) {
        self.images[name] = { path: path, img: new Image() };
        self.imageCount++;
    };
    this.get = function(name) {
        if (!self.images[name])
            alert('Image undefined: '+name);
        return self.images[name].img;
    };
    this.loadedOne = function() {
        self.loaded++;
        if (self.loaded == self.imageCount) {
            self.callback();
        }
        else {  // reset timeout
            clearTimeout(self.timeout);
            self.timeout = setTimeout(function() { self.timeIsOut(); },
                timeout*1000);
        }
    };
    this.timeIsOut = function() {
        alert('Image load timeout');
        self.loaded = this.imageCount;    // prevent callback from later
        self.callback();
    };
    this.loadAll = function(callback) {
        self.callback = callback;
        for (ix in self.images)
        {
            self.images[ix].img.onload = self.loadedOne;
            self.images[ix].img.src = self.images[ix].path;
        }
    };
};
