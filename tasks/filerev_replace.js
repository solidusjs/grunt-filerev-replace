/*
 * grunt-filerev-replace
 * https://github.com/SparkartGroupInc/grunt-filerev-replace
 *
 * Copyright (c) 2013 Sparkart Group, Inc.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

var STARTING_DELIMITERS = '\'"\\('; 
var ENDING_DELIMITERS   = '\'"\\)\\?#'; 
var STARTING_DELIMITER  = '([' + STARTING_DELIMITERS + '])';
var ENDING_DELIMITER    = '([' + ENDING_DELIMITERS + '])';
var ASSET_PATH_START    = '([^' + ENDING_DELIMITERS + ']*';
var ASSET_PATH_END      = '[^' + ENDING_DELIMITERS + ']*)';

module.exports = function(grunt) {
  grunt.registerMultiTask('filerev_replace', 'Replace references to grunt-filerev files.', function() {
    var assets_root = this.options().assets_root;
    var views_root = this.options().views_root || assets_root;
    var assets_paths = filerev_summary_to_assets_paths( assets_root );

    this.files[0].src.forEach( function( view_src ){
      var changes = replace_assets_paths_in_view( assets_paths, view_src, views_root );
      log_view_changes( view_src, changes );
    });
  });

  function filerev_summary_to_assets_paths( assets_root ) {
    var assets = {};
    for( var path in grunt.filerev.summary ){
      var src = file_path_to_web_path( path, assets_root );
      var dest = file_path_to_web_path( grunt.filerev.summary[path], assets_root );
      var regexp = asset_path_regexp( src );
      assets[src] = { dest: dest, regexp: regexp };
    }
    return assets;
  }

  // file_path => 'tmp/assets/images/ajax-loader.gif'
  // root => 'tmp/assets'
  // returns => '/images/ajax-loader.gif'
  function file_path_to_web_path( file_path, root ) {
    return path.join( '/', path.relative( root, file_path ) );
  }

  function asset_path_regexp( asset_path ) {
    return new RegExp( STARTING_DELIMITER + // p1
                       ASSET_PATH_START + escape_for_regexp( asset_path ) + ASSET_PATH_END + // p2
                       ENDING_DELIMITER, // p3
                       'ig' );
  }

  function escape_for_regexp( string ) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function replace_assets_paths_in_view( assets_paths, view_src, views_root ) {
    var view = grunt.file.read( view_src );
    var changes = [];

    var replace_string = function( match, p1, p2, p3 ) {
      var asset_path = absolute_asset_path( p2, view_src, views_root );

      if( grunt.file.arePathsEquivalent( asset_path.toLowerCase(), asset_src.toLowerCase() ) ) {
        changed = true;
        return p1 + asset_dest + p3;
      } else {
        return match;
      }
    };

    for( var asset_src in assets_paths ){
      var asset_dest = assets_paths[asset_src].dest;
      var changed = false;

      view = view.replace( assets_paths[asset_src].regexp, replace_string );

      if( changed ){
        changes.push( asset_src +' changed to '.grey+ asset_dest );
      }
    }

    grunt.file.write( view_src, view );
    return changes;
  }

  function absolute_asset_path( string, view_src, views_root ) {
    var asset_path = string.trim();
    if( !grunt.file.isPathAbsolute( asset_path ) ) {
      asset_path = path.join( path.dirname( view_src ), asset_path );
      asset_path = file_path_to_web_path( asset_path, views_root );
    }
    return asset_path;
  }

  function log_view_changes( view_src, changes ) {
    if( changes.length > 0 ){
      grunt.log.writeln( '✔ '.green+ view_src );
      for( var i in changes ){
        grunt.log.writeln( '  '+ changes[i] );
      }
    }
  }
};
