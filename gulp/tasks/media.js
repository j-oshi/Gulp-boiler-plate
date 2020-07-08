'use strict';

const { src, dest, series } = require('gulp');

const image = require('gulp-image');

function compressImage() {
  return src('./app/img/*')
    .pipe(image())
    .pipe(dest('./dist/img/'));
}

exports.task = compressImage;