'use strict';

const { src, dest, parallel } = require('gulp');

const clean = require('gulp-clean');

function cleanCss() {
  return src('./dist/styles').pipe(clean())
}

function cleanJs() {
  return src('./dist/js').pipe(clean())
}

function cleanImage() {
  return src('./dist/img').pipe(clean())
}

exports.task = parallel(cleanCss, cleanJs, cleanImage);
