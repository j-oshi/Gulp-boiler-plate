'use strict';

const css = require('../config');

const { src, dest, parallel, series } = require('gulp');

const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

let paths = {
  libs: [css.path.css.src + '**/*.scss', '!' + css.path.css.src + 'components/**/*.scss' ]
}

function concateSCSS() {
  return src(css.path.css.src + 'components/**/*.scss')
    .pipe(sassLint())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('component.css'))
    .pipe(dest(css.path.css.tmp));
}

function compileToCss() {
  return src(paths.libs)
    .pipe(sassLint())
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(css.path.css.tmp));
}

function minifyCss() {
  return src(css.path.css.tmp + '*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({extname: ".min.css"}))
    .pipe(sourcemaps.write())
    .pipe(dest(css.path.css.dist));
}

exports.task = series(parallel(compileToCss, concateSCSS), minifyCss);