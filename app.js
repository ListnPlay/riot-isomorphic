// SYSTEM JS
var System = require('systemjs');
require('./build/server/environment');
require('./build/config');

System.import('server/index');
