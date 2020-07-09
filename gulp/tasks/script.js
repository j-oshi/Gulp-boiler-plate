'use strict';

const js = require('../config');

const { src, dest, series } = require('gulp');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const rename = require("gulp-rename");

function transpileToES5() {
  return src(js.path.js.src + '**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(dest(js.path.js.tmp));
}

function minifyJs() {
  return src(js.path.js.tmp + '*.js')
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(js.path.js.dist));
}

exports.task = series(transpileToES5, minifyJs);