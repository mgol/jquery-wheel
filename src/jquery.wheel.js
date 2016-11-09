/**
 * jquery.wheel plugin
 * jQuery plugin creating a wheel event based on DOM3 wheel event
 *
 * Author & Copyright: Michał Gołębiowski <m.goleb@gmail.com>
 * License: MIT
 * Repository: https://github.com/mzgol/jquery-wheel
 *
 * Thanks to Brandon Aaron (http://brandonaaron.net) for the idea of this plugin.
 */

(function () {
    'use strict';

    if (jQuery.fn.wheel) { // already polyfilled
        return;
    }

    // Normalizing event properties for the 'wheel' event (like event.which etc.).
    // This is only needed for jQuery <3.0.
    if (jQuery.event.fixHooks) {
        jQuery.event.fixHooks.wheel = jQuery.event.mouseHooks;
    }

    var handler = function (orgEvent) {
        var i;
        var args = Array(arguments.length);
        var ev = jQuery.event.fix(orgEvent);

        for (i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }

        ev.deltaMode = orgEvent.deltaMode;
        ev.deltaX = orgEvent.deltaX;
        ev.deltaY = orgEvent.deltaY;
        ev.deltaZ = orgEvent.deltaZ;

        // Exchange original event for the modified one in arguments list.
        args[0] = ev;

        return jQuery.event.dispatch.apply(this, args);
    };

    // Implementing jQuery `wheel` event via native `wheel` event.
    jQuery.event.special.wheel = {
        setup: function () {
            this.addEventListener('wheel', handler);
        },

        teardown: function () {
            this.removeEventListener('wheel', handler);
        },
    };

    // Implement `$object.wheel()` and `$object.wheel(handler)`.
    jQuery.fn.wheel = function (data, fn) {
        return arguments.length > 0 ?
            this.on('wheel', null, data, fn) :
            this.trigger('wheel');
    };
})();
