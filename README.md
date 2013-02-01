wheel
=====

jQuery plugin creating a wheel event based on DOM3 wheel event: http://www.w3.org/TR/DOM-Level-3-Events/#event-type-wheel. When available, it uses native wheel event; otherwise fallbacks to mousewheel event.

## USAGE

To provide consistency with the rest of jQuery mouse events, this plugin defines the following fields on the jQuery wheel event:
* **deltaMode** - unit indicator (pixels, lines, or pages) for the deltaX, deltaY, and deltaZ attributes
* **deltaX**, **deltaY**, **deltaZ** - amount to scroll along each axis (deltaZ is not supported in WebKit & Opera, deltaX is not supported in Opera)

Example usage:

	$(element).wheel(function (evt) {
		if (evt.deltaY > 0) { /* zooming out handling */ }
		else { /* zooming in handling */ }
	});


