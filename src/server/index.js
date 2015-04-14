'use strict';

import riot from 'riot';
import main from '../app/components/main';
import fruitStore from '../app/stores/fruit-store';

import feathers from 'feathers';
import bodyParser from 'body-parser';

import Q from 'q';
import FS from 'fs';

import routes from '../app/routes';


import fruitService from './services/fruit';


let app = feathers();

let publicFiles = [];

// Escape the SystemJS dir
app.use(feathers.static(process.env.APP_BASE_PATH + "/public"));

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
            console.log("App engine error: ", e, " Filepath: ", filePath, " Callback: ", callback);
            return;
        }
    });
})

app.set('views', './build/'); // specify the views directory
app.set('view engine', 'html'); // register the template engine

app.use(function (req, res, next) {
    next(); // Process routes
    // don't render view for file requests (Currently just looks for a file extension)
    if(!req.path.match(/^.*\.[\w]+$/)) {
        res.render('index', {mainTag: 'main', tagOpts: {fruitStore: fruitStore}});
    }
});

// Client routes
routes.runRoutingTable(app);

// Server routes
let server = app.configure(feathers.rest())
  .use(bodyParser.json())
  .use('/fruit', fruitService)
  .listen(3000, () => {

    let host = server.address().address
    let port = server.address().port

    console.log('Node/Feathers app listening at http://%s:%s', host, port);
});
