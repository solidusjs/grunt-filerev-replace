// Absolute path
var path = '/images/ajax-loader.4e26f87c.gif';

// Relative path
var path = '/oops/../images/ajax-loader.4e26f87c.gif';
var path = '../images/ajax-loader.4e26f87c.gif';
var path = '../oops/../images/oops/../ajax-loader.4e26f87c.gif';

// Delimiters
var path = "/images/ajax-loader.4e26f87c.gif";
var path = '<img src="/images/ajax-loader.4e26f87c.gif" />';
var path = "var path = '/images/ajax-loader.4e26f87c.gif';";
var path = '/images/ajax-loader.4e26f87c.gif', path = "/images/ajax-loader.4e26f87c.gif";

// Escaped delimiters
var path = "body { background: url(\"/images/ajax-loader.4e26f87c.gif\"); }";

// Case insensitive
var path = '/IMAGES/ajax-loader.4e26f87c.gif';

// With query string and anchor
var path = '/images/ajax-loader.4e26f87c.gif?a=b';
var path = '/images/ajax-loader.4e26f87c.gif#a';

// Invalid
var path = 'ajax-loader.gif';
var path = '/images/ajax-loader';
var path = '/images/ajax-loader.gif.bak';
var path = '/images/not-ajax-loader.gif';
var path = 'images/ajax-loader.gif';
var path = '/more/images/ajax-loader.gif';
var path = '/cool_images/ajax-loader.gif';
var path = 'http://othersite.com/images/ajax-loader.gif';
