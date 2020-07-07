const { task, parallel } = require('gulp');

const css = require('./gulp/tasks/css');
const js = require('./gulp/tasks/script');

const buildCssJs = parallel(css.task, js.task);

task('buildCssJs', buildCssJs);

// task('buildCss', css.task);