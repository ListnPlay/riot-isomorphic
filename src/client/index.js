'use strict';

import riot from 'riot';
import socketUtil from '../app/util/socket';

import main from '../app/components/main';
import pageExpressMapper from 'page.js-express-mapper.js';
import page from 'page';
import routes from '../app/routes';

import _ from 'underscore'


window.page = page;

let loadContext = {};

// activate express-mapper plugin
pageExpressMapper({
    renderMethod: null,
    expressAppName: 'app'
});

socketUtil.initWithUrl('http://localhost:3000');

routes.runRoutingTable(window.app, loadContext);

page();

console.log("Context after routing ", loadContext);

let rendered = false;
let waitBeforeRendering = [];
if (loadContext.waitBeforeRendering) {
    // Create a copy
    waitBeforeRendering = loadContext.waitBeforeRendering.slice();
}

function renderTest() {
     if (!rendered && waitBeforeRendering.length == 0 && document.querySelector('main')) {
         rendered = true;
         routes.browserDispather.stores.server.observer.off('*');
         console.log("Rendering client");
         riot.mount('main', {stores: routes.browserDispather.stores, dispatcher: routes.browserDispather});
     }
}
 // Subscribe to all events
if (loadContext.waitBeforeRendering) {
     loadContext.waitBeforeRendering.forEach((eventName) => {
         routes.browserDispather.stores.server.observer.on(eventName, () => {
             waitBeforeRendering = _.without(waitBeforeRendering, eventName);
             renderTest();
         });
     });
}

renderTest(); 
window.onload = function() {
    console.log("Page loaded!");
    renderTest();
}

