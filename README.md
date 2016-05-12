# grunt-filerev-replace

> Replace references to grunt-filerev files.

## Getting Started
This plugin requires Grunt `>=0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-filerev-replace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-filerev-replace');
```

## The "filerev_replace" task

### Overview
In your project's Gruntfile, add a section named `filerev_replace` to the data object passed into `grunt.initConfig()`. See the test files for a working example.

```js
grunt.initConfig({
  // Filerev all images
  filerev: {
    images: { src: 'tmp/assets/images/**/*' }
  },

  // Replace references to the images in the compiled js and css files, and the html views
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
  }
});
```

### Options

#### options.assets_root
Type: `String`
Required

The root path from where assets are served by the web application.

#### options.views_root
Type: `String`
Default value: assets_root

The root path from where views are served by the web application.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
