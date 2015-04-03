'use strict';

import riot from 'riot-node';
import from './components/main';
import fruitStore from './stores/fruit-store';

import express from 'express';

import Q from 'q';
import FS from 'fs';

import routes from './routes';

let app = express();


// Escape the SystemJS dir
app.use(express.static(process.env.APP_BASE_PATH + "/public"));

// Riot app template engine
app.engine('html', function (filePath, options, callback) { 
    Q.spawn(function* () {
        try {
            let view = riot.render(options.mainTag, options.tagOpts);
            let regex = new RegExp('<' + options.mainTag + '.*<\/' + options.mainTag + '>');
            // Loading HTML file
            let content = yield Q.denodeify(FS.readFile)(filePath);
            let rendered = content.toString().replace(regex, view);
            return callback(null, rendered);
        }
        catch (e) {
            return callback(e);
        }
    });
})

app.set('views', './'); // specify the views directory
app.set('view engine', 'html'); // register the template engine

app.use(function (req, res, next) {
    next(); // Process routes
    res.render('index', {mainTag: 'main', tagOpts: {fruitStore: fruitStore}});
});


routes.runRoutingTable(app);

let server = app.listen(3000, function () {

    let host = server.address().address
    let port = server.address().port

    console.log('Node app listening at http://%s:%s', host, port);
});



