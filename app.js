// SYSTEM JS
var System = require('systemjs');
require('./build/environment-server');
require('./build/config');

System.import('./index-server');
