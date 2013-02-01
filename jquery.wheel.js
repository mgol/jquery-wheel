/**
 * Author: Michał Gołębiowski <michal.golebiowski@laboratorium.ee>
 * Author: Brandon Aaron (http://brandonaaron.net)
 * Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Copyright (c) 2013 Laboratorium EE (http://laboratorium.ee)
 */

/*global WheelEvent: false */
(function ($) {
    'use strict';

    var nativeEvent;
    try {
        // Modern browsers support 'wheel' => polyfill not needed.
        if (new WheelEvent('wheel')) {
            nativeEvent = 'wheel';
        }
    } catch (e) {
        nativeEvent = 'mousewheel';
    }

    // Normalizing event properties for the 'wheel' event (like ev.which etc.).
    if (nativeEvent === 'wheel') {
        $.event.fixHooks.wheel = $.event.mouseHooks;
    } else {
        // We can't attach hooks to 'wheel' only since we need a type matching to originalEvent.type
        // and this field is non-mutable.
        $.event.fixHooks.mousewheel = $.event.mouseHooks;
    }

    function handler(orgEvent) {
        // Handler for the 'mousewheel' event (Chrome, Opera, Safari).

        var multiplier = -1 / 120,
            ev = $.event.fix(orgEvent);

        if (nativeEvent === 'wheel') {
            ev.deltaMode = orgEvent.deltaMode;
            ev.deltaX = orgEvent.deltaX;
            ev.deltaY = orgEvent.deltaY;
            ev.deltaZ = orgEvent.deltaZ;
        } else {
            ev.type = 'wheel';
            ev.deltaMode = 1; // delta === 1 => scrolled one line
            ev.deltaX = ev.deltaZ = 0; // defaults

            ev.deltaY = multiplier * orgEvent.wheelDelta;
            // Webkit supports wheelDeltaX as well.
            if (orgEvent.wheelDeltaX != null) {
                ev.deltaX = multiplier * orgEvent.wheelDeltaX;
            }
        }

        // Exchange original event for the modified one in arguments list.
        var args = [].slice.call(arguments, 0);
        args[0] = ev;

        /*jshint validthis:true */ // event handler
        return $.event.dispatch.apply(this, args);
    }

    // Implementing 'wheel' using non-standard 'mousewheel' event.
    $.event.special.wheel = {
        setup: function () {
            this.addEventListener(nativeEvent, handler, false);
        },

        teardown: function () {
            this.removeEventListener(nativeEvent, handler, false);
        }
    };
})(jQuery);
