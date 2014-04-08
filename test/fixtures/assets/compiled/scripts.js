// Absolute path
var path = '/images/ajax-loader.gif';

// Relative path
var path = '/oops/../images/ajax-loader.gif';
var path = '../images/ajax-loader.gif';
var path = '../oops/../images/oops/../ajax-loader.gif';

// Delimiters
var path = "/images/ajax-loader.gif";
var path = '<img src="/images/ajax-loader.gif" />';
var path = "var path = '/images/ajax-loader.gif';";
var path = '/images/ajax-loader.gif', path = "/images/ajax-loader.gif";

// Escaped delimiters
var path = "body { background: url(\"/images/ajax-loader.gif\"); }";

// Case insensitive
var path = '/IMAGES/ajax-loader.gif';

// With query string and anchor
var path = '/images/ajax-loader.gif?a=b';
var path = '/images/ajax-loader.gif#a';

// Invalid
var path = 'ajax-loader.gif';
var path = '/images/ajax-loader';
var path = '/images/ajax-loader.gif.bak';
var path = '/images/not-ajax-loader.gif';
var path = 'images/ajax-loader.gif';
var path = '/more/images/ajax-loader.gif';
var path = '/cool_images/ajax-loader.gif';
var path = 'http://othersite.com/images/ajax-loader.gif';
