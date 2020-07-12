'use strict';

const { src } = require('gulp');

const clean = require('gulp-clean');

function cleanCss() {
  return src(['./tmp/styles', './dist/styles'], {read: false, allowEmpty: true}).pipe(clean())
}

function cleanJs() {
  return src('./dist/js', {read: false, allowEmpty: true}).pipe(clean())
}

function cleanImage() {
  return src('./dist/img', {read: false, allowEmpty: true}).pipe(clean())
}

exports.cssTask = cleanCss;
exports.jsTask = cleanJs;
exports.imgTask = cleanImage;