wheel
=====

[![Travis build](https://img.shields.io/travis/mgol/jquery-wheel.svg?style=flat-square)](https://travis-ci.org/mgol/jquery-wheel)
[![Version](https://img.shields.io/npm/v/jquery-wheel.svg?style=flat-square)](http://npm.im/jquery-wheel)
[![Downloads](https://img.shields.io/npm/dm/jquery-wheel.svg?style=flat-square)](http://npm-stat.com/charts.html?package=jquery-wheel)
[![MIT License](https://img.shields.io/npm/l/jquery-wheel.svg?style=flat-square)](http://opensource.org/licenses/MIT)

jQuery plugin creating a wheel event based on DOM3 wheel event: http://www.w3.org/TR/DOM-Level-3-Events/#event-type-wheel. It uses native wheel event under the hood.

## USAGE

To provide consistency with the rest of jQuery mouse events, this plugin defines the following fields on the jQuery wheel event:
* **deltaMode** - unit indicator (pixels, lines, or pages) for the deltaX, deltaY, and deltaZ attributes
* **deltaX**, **deltaY**, **deltaZ** - amount to scroll along each axis (deltaZ is not supported in WebKit & Presto so it's set to 0 in these engines)

Example usage:

	$(element).on('wheel', function (evt) {
		if (evt.deltaY > 0) { /* zooming out */ }
		else { /* zooming in */ }
	});

Works with jQuery 1.7.0+.


Browser support
---------------

The following browsers are supported:
* Firefox, Chrome, Safari, Opera - current and previous version
* IE 9 and newer

The plugin should work in most older non-IE browsers, too, but it's not tested against those versions.
