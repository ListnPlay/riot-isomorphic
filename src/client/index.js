'use strict';

import riot from 'riot';
import main from '../app/components/main';
import pageExpressMapper from 'page.js-express-mapper.js';
import page from 'page';
import routes from '../app/routes';
import stores from '../app/stores';
import RiotControl from 'riotcontrol';
import _ from 'underscore'

window.page = page;

let loadContext = {};


// activate express-mapper plugin
pageExpressMapper({
    renderMethod: null,
    expressAppName: 'app'
});


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
         stores.server.off('*');
         riot.mount('main', {stores: stores});
     }
}
 // Subscribe to all events
if (loadContext.waitBeforeRendering) {
     loadContext.waitBeforeRendering.forEach((eventName) => {
         stores.server.on(eventName, () => {
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

