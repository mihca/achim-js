"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _stravaSaison = require("strava-saison");

var _stravaSaison2 = _interopRequireDefault(_stravaSaison);

(function ($) {
    /*  once the DOM (and its <link> tags) is ready...  */
    $(document).ready(function () {

        /*  once jQuery.Markup has loaded the markup templates...  */
        $.markup.debug = 4;
        $.markup.load(function () {

            /*  render a "hello" container markup  */
            var h = $("body").markup("hello");

            /*  insert ten message markups  */
            for (var i = 0; i < 3; i++) {
                $(h).markup("hello/message", {
                    i: i, k: i % 2,
                    message: "Hello World"
                });
            }
        });

        var stravaSeason = new _stravaSaison2["default"]();
        stravaSeason.calYear(2013, false);
        stravaSeason.calYear(2014, false);
        stravaSeason.calYear(2015, false);
    });
})(jQuery);

//# sourceMappingURL=main-compiled.js.map