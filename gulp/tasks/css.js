'use strict';

const css = require('../config');

const { src, dest, series } = require('gulp');

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

function compileToCss() {
  return src(css.path.css.src + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(css.path.css.tmp));
}

function minifyCss() {
  return src(css.path.css.tmp + '*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({extname: ".min.css"}))
    .pipe(dest(css.path.css.dist));
}

exports.task = series(compileToCss, minifyCss);