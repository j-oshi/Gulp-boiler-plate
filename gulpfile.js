const { task, parallel, series } = require('gulp');

const cleanFolders = require('./gulp/tasks/cleanFolders');
const css = require('./gulp/tasks/css');
const js = require('./gulp/tasks/script');
const img = require('./gulp/tasks/media');

const buildCssJs = parallel(css.task, js.task, img.task);

const build = series(cleanFolders.task, buildCssJs)

task('buildCssJs', build);

// task('buildCss', css.task);