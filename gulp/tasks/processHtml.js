const { src, dest, parallel, series } = require('gulp');
const inject = require('gulp-inject');

function processHTML() {
  let target = src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  let sources = src(['./dist/**/*.js', './dist/**/*.css'], { read: false });

  return target.pipe(inject(sources))
    .pipe(dest('./dist'));
}

exports.task = processHTML;