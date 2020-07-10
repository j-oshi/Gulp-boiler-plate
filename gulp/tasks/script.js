'use strict';

const js = require('../config');

const { src, dest } = require('gulp');

const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const rename = require("gulp-rename");

function transpileMinifyToES5() {
  return src(js.path.js.src + '**/*.js')
    .pipe(jshint())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(js.path.js.dist));
}

exports.task = transpileMinifyToES5;