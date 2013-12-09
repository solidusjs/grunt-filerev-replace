'use strict';

var grunt = require('grunt');

exports.filerev_replace = {
  js: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/assets/compiled/scripts.js');
    var expected = grunt.file.read('test/expected/assets/compiled/scripts.js');
    test.equal(actual, expected);

    test.done();
  },
  css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/assets/compiled/styles.css');
    var expected = grunt.file.read('test/expected/assets/compiled/styles.css');
    test.equal(actual, expected);

    test.done();
  },
  html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/views/index.html');
    var expected = grunt.file.read('test/expected/views/index.html');
    test.equal(actual, expected);

    test.done();
  },
  html_subfolder: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/views/media/index.html');
    var expected = grunt.file.read('test/expected/views/media/index.html');
    test.equal(actual, expected);

    test.done();
  }
};
