// SYSTEM JS
var System = require('systemjs');
require('./build/server/environment');
require('./build/app/config');
require('./build/app/map');

System.import('./server/index');
