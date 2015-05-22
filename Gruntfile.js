
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-browserify");

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: "jshint.json"
            },
            "gruntfile":  [ "Gruntfile.js" ],
            "oset": [ "src/**/*.js" ]
        },
        browserify: {
            "oset": {
                files: {
                    "lib/oset.js": [ "src/**/*.js" ]
                },
                options: {
                    transform: [ "babelify" ],
                    plugin: [
                        [ "browserify-derequire" ],
                        [ "browserify-header" ]
                    ],
                    browserifyOptions: {
                        standalone: "OSet",
                        debug: true
                    }
                }
            }
        },
        "bower-install-simple": {
            "sample": {
                options: {
                    color:       true,
                    production:  true,
                    directory:   "bower_components"
                }
            }
        },
        connect: {
            "sample": {
                options: {
                    port: 12345,
                    base: "."
                }
            }
        },
        clean: {
            "clean": {
                src: [ "node_modules", "bower_components" ]
            }
        }
    });

    grunt.registerTask("default", [ "bower-install-simple", "jshint", "browserify" ]);
    grunt.registerTask("server", [ "connect:sample:keepalive" ]);
};

