'use strict';

const { src, dest } = require('gulp');
var sass = require('gulp-sass');

function compileToCss() {
  return src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/styles/'));
}

exports.task = compileToCss;