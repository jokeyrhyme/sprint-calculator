'use strict';

// foreign modules

var autoprefixer = require('autoprefixer');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var cssnano = require('cssnano');
var gulp = require('gulp');
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// local modules

var pkg = require('./package.json');

// this module

var deps = Object.keys(pkg.dependencies).filter(function (dep) {
  return dep.indexOf('.css') === -1; // skip normalize.css and other styles
});

gulp.task('serve', ['default'], function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch([
    './index.css',
    './components/**/*.css',
    './containers/**/*.css'
  ], ['build:css']);
  gulp.watch([
    './index.js',
    './components/**/*.js',
    './containers/**/*.js',
    './lib/**/*.js',
    './utils/**/*.js'
  ], ['build:js']);
  gulp.watch('./index.html').on('change', browserSync.reload);
  gulp.watch('./dist/**/*.js').on('change', browserSync.reload);
});

gulp.task('build:css', function () {
  return gulp.src(['./index.css'])
    .pipe(postcss([
      postcssImport(),
      autoprefixer({ browsers: ['last 2 versions'] }),
      cssnano()
    ]))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
gulp.task('build:vendor', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    // entries: './entry.js',
    debug: true
  });
  deps.forEach(function (dep) {
    b.require(dep);
  });
  return b.bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './index.js',
    debug: true
  });
  deps.forEach(function (dep) {
    b.exclude(dep);
  });
  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build:js', 'build:vendor', 'build:css']);
