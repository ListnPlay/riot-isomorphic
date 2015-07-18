# Isomorphic Riot
An attempt for an isomorphic appliction using RiotJS 2. Includes:
+ ES6 code base using Babel transpiler and Browserify. With ES7 async/await
(_SystemJS example available in the 'systemjs' branch_)
+ Shared routing code between client and server using [Page.js](https://visionmedia.github.io/page.js/) and [Page.JS-Express-Mapper](https://github.com/kethinov/page.js-express-mapper.js).
+ Riot rendering on the server side using riot.render() and a custom template engine.
+ Server services powered by [Feathers.js](http://feathersjs.com/) with Realtime WebSocket communication using Primus.
+ User authentication using [Passport.js](http://passportjs.org/)
+ **NEW: Flux architecture with custom dispatcher/store classes, that can be instatinated per server request. Inspired by [RiotControl](https://github.com/jimsparkman/RiotControl/) and [dispatchr](https://github.com/yahoo/dispatchr/)**
+ *waitBeforeRendering* - waits for events to occur before rendering the main tag
+ ES6 riot tag files without using the *.tag extension.
+ Support for Autoprefixer - Gulp tasks extract css from javascript tags, concatinate them and run postprocessing.
+ Gulp based tasks for running the node app using [gulp-live-server].

Install
```
npm install -g gulp
npm install
```
Run:
```
gulp
```
Then browse to http://localhost:3000
