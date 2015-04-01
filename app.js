// SYSTEM JS
var System = require('systemjs');
require('./build/environment-server');
require('./build/config');
require('./build/map');

System.import('./index-server');
