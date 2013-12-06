/*
 * grunt-filerev-replace
 * https://github.com/SparkartGroupInc/grunt-filerev-replace
 *
 * Copyright (c) 2013 Sparkart Group, Inc.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

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

      assets[src] = {
        dest: dest,
        regexp: new RegExp( '[^\'"\\(]*'+ regexp_escape( src ) +'[^\\?\'"\\)]*', 'ig' )
      };
    }
    return assets;
  }

  // file_path => 'tmp/assets/images/ajax-loader.gif'
  // root => 'tmp/assets'
  // returns => '/images/ajax-loader.gif'
  function file_path_to_web_path( file_path, root ) {
    return path.join( '/', path.relative( root, file_path ) );
  }

  function regexp_escape( string ) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function replace_assets_paths_in_view( assets_paths, view_src, views_root ) {
    var view = grunt.file.read( view_src );
    var changes = [];

    var replace_string = function(string) {
      var view_asset_path = string_to_view_asset_path( string, view_src, views_root );

      if( grunt.file.arePathsEquivalent( view_asset_path.toLowerCase(), asset_src.toLowerCase() ) ) {
        changed = true;
        return asset_dest;
      } else {
        return string;
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

  function string_to_view_asset_path( string, view_src, views_root ) {
    var view_asset_path = string.trim();
    if( !grunt.file.isPathAbsolute( view_asset_path ) ) {
      view_asset_path = path.join( path.dirname( view_src ), view_asset_path );
      view_asset_path = file_path_to_web_path( view_asset_path, views_root );
    }
    return view_asset_path;
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
