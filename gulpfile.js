'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var gls = require('gulp-live-server');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var autoprefixer = require ('gulp-autoprefixer');


var server;
var watchEvent;

// DEVELOPMENT TASKS
//================================================

/*
* 1. Setup a webserver with livereload using BrowserSync
* 2. JS and CSS get processed and served from the 'build' folder
* */

 // BrowserSync Server
gulp.task('browser-sync', function() {
  browserSync.init([
    './build/css/*.css',
    './build/js/**/*.js',
    './**/*.html'
  ],
  {
    notify: false,
    server: {
      baseDir: ['./']
    },
    port: 3500,
    browser: [],
    tunnel: false
  });
});

// ENV
gulp.task('env', function() {
  process.env.APP_BASE_PATH = __dirname;
});


gulp.task('css', function() {
    // Extract the CSS from the JS Files and place into a single style with autoprefixer
    return gulp.src('src/app/components/**/*.js')
    .pipe(replace(/(^[\s\S]*<style>|<\/style>[\s\S]*$)/gm, ''))
    .pipe(concat('style.css'))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest('build/app'));
});


gulp.task('public',['public-jspm', 'public-css', 'public-app', 'public-js'], function() {
  return gulp.src('build/client/**/*.js')
    .pipe(gulp.dest('public/build/client'));
});

gulp.task('public-jspm', function() {
    return gulp.src('jspm_packages/**/*.*')
    .pipe(gulp.dest('public/jspm_packages/'));
});
gulp.task('public-css', ['css'], function() {
    return gulp.src('build/app/**/*.css')
    .pipe(gulp.dest('public/build/app'));
});
gulp.task('public-app', ['js'], function() {
    return gulp.src('build/app/**/*.js')
    .pipe(gulp.dest('public/build/app'));
});
gulp.task('public-js' , ['js'], function() {
    return gulp.src('build/*.js')
    .pipe(gulp.dest('public'));
});

// JS
gulp.task('js', ['js-client', 'js-server', 'js-app'], function() {
    // config file
    return gulp.src('src/*.js')
      .pipe(gulp.dest('build'));
});

gulp.task('js-server', function() {
    return gulp.src('src/server/**/*.js')
      .pipe(gulp.dest('build/server'));
});

gulp.task('js-client', function() {
    return gulp.src('src/client/**/*.js')
      .pipe(gulp.dest('build/client'));
});

gulp.task('js-app', function() {
    return gulp.src('src/app/**/*.js')
      // remove the styles (they were extracted)
      .pipe(replace(/<style>[\s\S]*<\/style>/gm, ''))
      .pipe(gulp.dest('build/app'));
})

// HTML
gulp.task('html', function() {
  gulp.src(['./index.html'])
    .pipe(gulp.dest('./build'));
});

// serve task
gulp.task('serve', ['html', 'public', 'env'] , function(cb) {
  server = gls.new('app.js');
  server.start();


  gulp.watch(['./src/**/*.js'], function(event) {
      watchEvent = event;
      gulp.start('reload-server');
  });
  gulp.watch('app.js', server.start);
});

gulp.task('reload-server', ['public'], function() {
    console.log("Reloading server!")
    server.notify(watchEvent) ;
});


gulp.task('browser', ['browser-sync', 'html', 'js'] , function(cb) {

  plugins.watch(
      './src/**/*.js',
      {
        name: 'JS'
      },
      function() {
        gulp.start('js');
      }
  );
});

// Delete build Directory
gulp.task('delete-build', function() {
  rimraf('./build', function(err) {
    plugins.util.log(err);
  });
});

// Default
gulp.task('default', ['serve']);



// DISTRIBUTION TASKS
//===============================================

// Delete dist Directory
gulp.task('delete-dist', function() {
  rimraf('./dist', function(err) {
  });
});

gulp.task('public-dist', ['html-dist', 'js', 'css'], function() {
  gulp.src('build/app/**/*.css')
  .pipe(gulp.dest('public/build/app'));

gulp.src('build/index.html')
.pipe(gulp.dest('public/build'));

  gulp.src('dist/client/**/*.js')
    .pipe(gulp.dest('public/dist/client'));
});

gulp.task('html-dist', function() {
   gulp.src(['./dist-src/index.html'])
  .pipe(gulp.dest('./build'));
});

// Bundle with jspm
gulp.task('bundle', ['js'], plugins.shell.task([
     // Server bundle? Don't need for now
    // 'jspm bundle-sfx server/index dist/server/bundle.js',
    // Client bundle
    'jspm bundle-sfx client/index dist/client/bundle.js'
]));

// Uglify the bundle
gulp.task('uglify', function() {
  return gulp.src('./dist/js/app.js')
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.rename('app.min.js'))
    .pipe(gulp.dest('./dist/js'))
    .on('error', plugins.util.log);
});

gulp.task('dist', function() {
  runSequence(
    'delete-dist',
    'bundle',
    'public-dist',
    'serve-dist'
    // 'uglify'
  );
});

gulp.task('serve-dist', ['env'] , function(cb) {
  var server = gls.new('app.js');
  server.start();

});

