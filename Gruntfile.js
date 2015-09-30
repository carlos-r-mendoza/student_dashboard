'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //starts server
    develop: {
      server: {
        file: 'server/server.js'
      }
    },
    // javascript lint
    jshint: {
      options: {
        // more options here if you want to override JSHint defaults
        // JSHint will always fail if there is an error. By setting force to true we prevent this.
        force: true,
        reporter: require('jshint-stylish')
      },
      // define the files to lint
      files: ['client/javascript/**/*.js']
      // configure JSHint (documented at http://www.jshint.com/docs/)
    },
    // creates one javascript and one css file
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: '\r\n' 
      },
      css: {
        src: ['client/css/*.css'],
        dest: 'client/main.css'
      },
      js: {
        src: ['client/javascript/app.js', 'client/javascript/**/*.js'],
        dest: 'client/app.js'
      }
    },
    // minification of css
    cssmin: {
      target: {
        files: {
          'client/main.css': 'client/main.css'
        }
      }
    },
    // annotation of Angular JS files before uglification
    ngAnnotate: {
      target: {
        files: {
          'client/app.js': ['client/app.js']
        }
      }
    },
    // javascript uglification
    uglify: {
      js: {
        src: ['client/app.js'],
        dest: 'client/app.js'
      }
    },
    // cleaning of css and js file
    clean: {
      css: ['client/main.css'],
      js: ['client/app.js'],
    },
    // reloads page on changes to html, css, or js files
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      css: {
        options: { livereload: true },
        files: ['client/css/*.css'],
        tasks: ['clean:css', 'concat:css']
      },
      html: {
        options: { livereload: true },
        files: ['client/index.html', 'client/templates/*.html']
      },
      script: {
        options: { livereload: true },
        files: ['client/javascript/config.js', 'client/javascript/**/*.js'],
        tasks: ['clean:js', 'concat:js']
      }
    }
  });

  // tasks to run on "grunt" command
    // npm-install automatically does npm and bower installs
  grunt.registerTask('default', [
    'npm-install',
    'develop',
    'jshint',
    'clean',
    'concat',
    'watch'
  ]);

  // tasks to run on "grunt build" command
    // npm-install automatically does npm and bower installs
	grunt.registerTask('build', [
    'npm-install',
    'jshint',
    'clean',
    'concat',
    'cssmin',
    'ngAnnotate',
    'uglify'
  ]);

};