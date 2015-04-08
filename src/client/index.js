'use strict';

import riot from 'riot';
import from '../app/components/main';
import pageExpressMapper from 'kethinov/page.js-express-mapper.js';
import page from 'page';
import routes from '../app/routes';

import fruitStore from '../app/stores/fruit-store';

window.page = page;


// activate express-mapper plugin
pageExpressMapper({
    renderMethod: null,
    expressAppName: 'app'
    });


routes.runRoutingTable(window.app);

page();


// Check if the main tag was loaded
let mainTag = document.querySelector('main');
console.log("Main tag ???!", mainTag);
if (mainTag) {
    startApp();        
} 
else {
    // Wait for full page load
    window.onload = function() {
        console.log("Page loaded!");
        startApp();
    }
}

function startApp() {
    riot.mount('main', {fruitStore: fruitStore});
}


