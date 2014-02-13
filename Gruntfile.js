/*
 * grunt-filerev-replace
 * https://github.com/solidusjs/grunt-filerev-replace
 *
 * Copyright (c) 2013 Sparkart Group, Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: ['tmp'],
    },

    copy: {
      test: { expand: true, cwd: 'test/fixtures/', src: '**', dest: 'tmp/'}
    },

    filerev: {
      test: { src: 'tmp/assets/images/*' }
    },

    // Configuration to be run (and then tested).
    filerev_replace: {
      options: {
        assets_root: 'tmp/assets/'
      },
      compiled_assets: {
        src: 'tmp/assets/compiled/*.{css,js}'
      },
      views: {
        options: {
          views_root: 'tmp/views/'
        },
        src: 'tmp/views/**/*.html'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-filerev');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'filerev', 'filerev_replace', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
