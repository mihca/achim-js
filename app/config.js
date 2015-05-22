require.config({
  // make components more sensible
  // expose jquery 
  paths: {
    "components": "../bower_components",
    "jquery-markup": "../bower_components/jquery-markup/jquery.markup",
    "jquery": "../bower_components/jquery/dist/jquery"
  }
});

require(['main'], function(){ });
