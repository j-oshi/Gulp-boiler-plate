'use strict';

const media = require('../config');

const { src, dest } = require('gulp');

const image = require('gulp-image');
const changed = require('gulp-changed');
const rename = require("gulp-rename");

function compressImage() {
  return src(media.path.media.src + "**/*.+(png|jpg|gif|svg)", { base: '.' })
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace('app', 'dist');
    }))
    .pipe(changed('.'))
    .pipe(image())
    .pipe(dest('.'));
}

exports.task = compressImage;