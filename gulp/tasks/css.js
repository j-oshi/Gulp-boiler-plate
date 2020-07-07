'use strict';

const { src, dest, series } = require('gulp');

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

function compileToCss() {
  return src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/styles/'));
}

function minifyCss() {
  return src('./dist/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({extname: ".min.css"}))
    .pipe(dest('./dist/styles/'));
}

exports.task = series(compileToCss, minifyCss);