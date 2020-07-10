'use strict';

const media = require('../config');

const { src, dest } = require('gulp');

const image = require('gulp-image');
const changed = require('gulp-changed');

function compressImage() {
  return src(media.path.media.src + "*")
    .pipe(changed(media.path.media.dist))
    .pipe(image())
    .pipe(dest(media.path.media.dist));
}

exports.task = compressImage;