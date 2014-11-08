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
        '<%= nodeunit.normal %>',
        '<%= nodeunit.relative %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      tests: ['tmp']
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
      },
      relative_compiled_assets: {
          options: {
              use_relative_root: true
          },
          src: 'tmp/assets/compiled/*.{css,js}'
      },
      relative_views: {
        options: {
            use_relative_root: true,
            views_root: 'tmp/views/'
        },
        src: 'tmp/views/**/*.html'
      }
    },

    // Unit tests.
    nodeunit: {
        normal: ['test/filerev_replace_test.js'],
        relative:['test/filerev_replace_relative_test.js']
    }

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
  grunt.registerTask('test-normal', ['clean', 'copy', 'filerev', 'filerev_replace:compiled_assets', 'filerev_replace:views', 'nodeunit:normal', 'clean']);
  grunt.registerTask('test-relative', ['clean', 'copy', 'filerev', 'filerev_replace:relative_compiled_assets', 'filerev_replace:relative_views', 'nodeunit:relative', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test-normal', 'test-relative']);

};
