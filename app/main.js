// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery","jquery-markup"], function($) {
  $('body').append('jQuery ' + $.fn.jquery + ' loaded!');

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

    calYear(2013, false);
    calYear(2014, false);
    calYear(2015, false);
  });

});
