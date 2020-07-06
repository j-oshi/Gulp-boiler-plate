const { task } = require('gulp');

const css = require('./gulp/tasks/css');

task('buildCss', css.task);