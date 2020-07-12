'use strict';

const css = require('../config');

const { src, dest, parallel, series } = require('gulp');

const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// Path to exclude using globbng patterns
let paths = {
  libs: [css.path.css.src + '**/*.scss', '!' + css.path.css.src + 'components/**/*.scss' ]
}

function concateSCSS() {
  return src(css.path.css.src + 'components/**/*.scss')
    .pipe(sassLint())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('component.css'))
    .pipe(dest(css.path.css.tmp + 'components'));
}

function compileToCss() {
  return src(paths.libs, { base: '.' })
    .pipe(sassLint())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function(path) {
      const mapObj = {
        app:"tmp",
        scss:"styles"
      };
      path.dirname = path.dirname.replace(/app|scss/gi, function(matched){
        return mapObj[matched];
      });
    }))
    .pipe(dest('.'));
}

function minifyCss() {
  return src(css.path.css.tmp + '**/*.css', { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace('tmp', 'dist');
      path.extname = '.min.css';
    }))   
    .pipe(sourcemaps.write('./'))
    .pipe(dest('.'));
}

exports.task = series(parallel(compileToCss, concateSCSS), minifyCss);