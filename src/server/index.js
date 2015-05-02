'use strict';

import riot from 'riot';
import feathers from 'feathers';

import feathersPassport from 'feathers-passport';
import hooks from 'feathers-hooks';

import bodyParser from 'body-parser';
import session from 'express-session';

import Q from 'q';
import FS from 'fs';
import _ from 'underscore'


import main from '../app/components/main';
import routes from '../app/routes';

import services from './services';

import socketUtil from '../app/util/socket';

let app = feathers();

// Escape the SystemJS dir
app.use(feathers.static(process.env.APP_BASE_PATH + "/public"));

// Riot app template engine
app.engine('html', function (filePath, options, callback) { 
    async function render() {
        try {
            let view = riot.render(options.mainTag, options.tagOpts);
            let regex = new RegExp('<' + options.mainTag + '.*<\/' + options.mainTag + '>');
            // Loading HTML file
            let content = await Q.denodeify(FS.readFile)(filePath);
            let rendered = content.toString().replace(regex, view);
            return callback(null, rendered);
        }
        catch (e) {
            console.log("App engine error: ", e, " Filepath: ", filePath, " Callback: ", callback);
            console.log(e.stack);
            return;
        }
    }

    render();
})

app.set('views', './build/'); // specify the views directory
app.set('view engine', 'html'); // register the template engine


// Client routes
routes.runRoutingTable(app);


// Server routes
app.configure(
    feathers.rest()
)
.configure(feathers.primus({
    transformer: 'websockets'

}, function(primus) {
}))
.configure(hooks())
.use(bodyParser.json())
.configure(feathersPassport({
    secret: 'eat-your-fruits',
    // In production use RedisStore
    store: new session.MemoryStore(),
    resave: true,
    saveUninitialized: true
}))
.use('/fruit', services.fruit)
.use('/taste', services.taste)
.use('/users', services.users)

// Authentication setup
let userService = app.service('users');

services.users.insertHooks(userService);
services.users.createTestUser(userService);
services.users.setupPassport(userService, app);

app.use(function (req, res, next) {

    let rendered = false;
    let waitBeforeRendering = [];
    if (req.waitBeforeRendering) {
        // Create a copy
        waitBeforeRendering = req.waitBeforeRendering.slice();
    }

   function renderTest() {
        if (!rendered && waitBeforeRendering.length == 0) {
            rendered = true;
            res.render('index', {mainTag: 'main', tagOpts: {'dispatcher': req.dispatcher}});
        }
    }
    // Subscribe to all events
    if (req.waitBeforeRendering) {
        req.waitBeforeRendering.forEach((eventName) => {
            req.dispatcher.one(eventName, () => {
                waitBeforeRendering = _.without(waitBeforeRendering, eventName);
                renderTest();
            });
        });
    }
    renderTest(); 
});

console.log("Starting server");

// Server routes
let server = 
    app.listen(3000, () => {

    let host = server.address().address
    let port = server.address().port

    console.log('Node/Feathers app listening at http://%s:%s', host, port);


    // Init the loopback socket connection
    socketUtil.initWithUrl('http://localhost:3000');
});

