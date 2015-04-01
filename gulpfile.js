'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var gls = require('gulp-live-server');

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
  process.env.SYSTEM_JS_PATH = __dirname + "/build"
});

// PUBLIC 
gulp.task('public', function() {
  process.env.SYSTEM_JS_PATH = __dirname + "/build"
  gulp.src('jspm_packages/**/*.*')
        .pipe(gulp.dest('public/jspm_packages/'));
    return gulp.src('src/**/*.js')
        .pipe(gulp.dest('public/build/'));
});

// JS
gulp.task('js', function() {
  return gulp.src('src/**/*.js')
      .pipe(gulp.dest('build/'));
});

// HTML
gulp.task('html', function() {
  gulp.src(['./index.html'])
    .pipe(gulp.dest('./build'));
});

// serve task
gulp.task('serve', ['html', 'js', 'public', 'env'] , function(cb) {
  var server = gls.new('app.js');
  server.start();


  plugins.watch(
      './src/**/*.js',
      {
        name: 'JS'
      },
      function() {
        gulp.start('public');
        server.notify();
      }
  );
  gulp.watch('app.js', server.start);
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

//build (no server)
gulp.task('build', ['sass']);

// Default
gulp.task('default', ['serve']);



// DISTRIBUTION TASKS
//===============================================

// Delete dist Directory
gulp.task('delete-dist', function() {
  rimraf('./dist', function(err) {
    plugins.util.log(err);
  });
});

// CSS
gulp.task('css', function() {
  return gulp.src('./build/css/main.css')
    .pipe(gulp.dest('./dist/css'))
    .pipe(plugins.csso())
    .pipe(plugins.rename('main.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .on('error', plugins.util.log);
});

// Bundle with jspm
gulp.task('bundle', ['js'], plugins.shell.task([
  'jspm bundle-sfx build/js/main dist/js/app.js'
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
    'build',
    ['css', 'html', 'bundle'],
    'uglify'
  );
});
