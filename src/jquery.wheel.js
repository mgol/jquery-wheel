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

(function ($) {
    'use strict';

    if ($.fn.wheel) { // already polyfilled
        return;
    }

    // Normalizing event properties for the 'wheel' event (like event.which etc.).
    $.event.fixHooks.wheel = $.event.mouseHooks;

    var handler = function (orgEvent) {
        var i;
        var args = Array(arguments.length);
        var event = $.event.fix(orgEvent);

        for (i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }

        event.deltaMode = orgEvent.deltaMode;
        event.deltaX = orgEvent.deltaX;
        event.deltaY = orgEvent.deltaY;
        event.deltaZ = orgEvent.deltaZ;

        // Exchange original event for the modified one in arguments list.
        args[0] = event;

        return $.event.dispatch.apply(this, args);
    };

    // Implementing jQuery `wheel` event via native `wheel` event.
    $.event.special.wheel = {
        setup: function () {
            this.addEventListener('wheel', handler, false);
        },

        teardown: function () {
            this.removeEventListener('wheel', handler, false);
        },
    };

    // Implement `$object.wheel()` and `$object.wheel(handler)`.
    $.fn.wheel = function (data, fn) {
        return arguments.length > 0 ?
            this.on('wheel', null, data, fn) :
            this.trigger('wheel');
    };
})(jQuery);
