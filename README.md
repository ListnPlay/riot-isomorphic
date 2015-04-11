# Isomorphic Riot
An attempt for an isomorphic appliction using RiotJS 2. Includes:
+ ES6 code base using JSPM/SystemJS and Babel transpiler __that run both on the server and the client__ - Also contains example usage of Q.spawn with generators and promises.
+ Shared routing code between client and server using [Page.js](https://visionmedia.github.io/page.js/) and [Page.JS-Express-Mapper](https://github.com/kethinov/page.js-express-mapper.js).
+ Riot rendering on the server side using riot.render() and a custom template engine.
+ Flux architecture with help of [RiotControl](https://github.com/jimsparkman/RiotControl/) - Also used for routing logic.
+ ES6 riot tag files without using the *.tag extension.
+ Support for Autoprefixer - Gulp tasks extract css from javascript tags, concatinate them and run postprocessing.
+ Gulp based tasks for running the node app using [gulp-live-server](https://github.com/gimm/gulp-live-server) or optionally run solely on the client using [BrowserSync](http://www.browsersync.io/).
+ *Currenly uses our own fork of RiotJS since the server side rendering code is not yet merged*

## Install
(*Make sure you have the latest version of JSPM before installing. The node version I used was 0.11.16*.):
```
npm install -g jspm gulp
npm install
jspm install
```

## Config
If using Windows environment, prepend `file:` in `gulpfile.js`
```
gulp.task('env', function() {
  process.env.APP_BASE_PATH = 'file:' + __dirname;
});
```

## Run
```
gulp
```

Or bundle for distribution and run:
```
gulp dist
````
