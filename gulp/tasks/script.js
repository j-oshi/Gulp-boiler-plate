'use strict';

const { src, dest, series } = require('gulp');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const rename = require("gulp-rename");

function transpileToES5() {
    return src('./app/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('./dist/js/'));
}

function minifyJs() {
    return src('./dist/js/*.js')
        .pipe(uglify())
        .pipe(rename({extname: ".min.js"}))
        .pipe(dest('./dist/js/'));
}

exports.task = series(transpileToES5, minifyJs);