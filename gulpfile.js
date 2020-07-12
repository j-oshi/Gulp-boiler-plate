const { task, watch, parallel, series } = require('gulp');

const cleanFolders = require('./gulp/tasks/cleanFolders');
const css = require('./gulp/tasks/css');
const js = require('./gulp/tasks/script');
const img = require('./gulp/tasks/media');


task('cleanCss', cleanFolders.cssTask);
task('cleanJs', cleanFolders.jsTask);
task('cleanImg', cleanFolders.imgTask);
task('cleanAll', parallel(cleanFolders.cssTask, cleanFolders.jsTask, cleanFolders.imgTask));

task('buildCss', css.task);
task('buildJs', js.task);
task('compressImg', img.task);

function watchTask(done) {
    const watcher = watch(['app/js/**/*.js', 'app/scss/**/*.scss', 'app/img/"**/*.+(png|jpg|gif|svg)'], series('cleanAll', parallel('buildJs', 'buildCss', 'compressImg')));

    watcher.on('change', async function(path, stats) {
      console.log(`File ${path} was changed`);
    });

    watcher.on('add', async function(path, stats) {
      console.log(`File ${path} was added`);
    });

    watcher.on('unlink', async function(path, stats) {
      console.log(`File ${path} was removed`);
    });

    done();
}

exports.watchAll = watchTask;

function watchCssTask(done) {
    const watcher = watch(['app/scss/**/*.scss'], series('cleanCss', 'buildCss'));

    watcher.on('change', async function(path, stats) {
      console.log(`File ${path} was changed`);
    });

    watcher.on('add', async function(path, stats) {
      console.log(`File ${path} was added`);
    });

    watcher.on('unlink', async function(path, stats) {
      console.log(`File ${path} was removed`);
    });

    done();
}

exports.watchCss = watchCssTask;

function watchJsTask(done) {
    const watcher = watch('app/js/**/*.js', series('cleanJs', 'buildJs'));

    watcher.on('change', async function(path, stats) {
      console.log(`File ${path} was changed`);
    });

    watcher.on('add', async function(path, stats) {
      console.log(`File ${path} was added`);
    });

    watcher.on('unlink', async function(path, stats) {
      console.log(`File ${path} was removed`);
    });

    done();
}

exports.watchJs = watchJsTask;

function watchImgTask(done) {
    const watcher = watch(['app/img/**/*.+(png|jpg|gif|svg)'], series('cleanImg', 'compressImg'));

    watcher.on('change', async function(path, stats) {
      console.log(`File ${path} was changed`);
    });

    watcher.on('add', async function(path, stats) {
      console.log(`File ${path} was added`);
    });

    watcher.on('unlink', async function(path, stats) {
      console.log(`File ${path} was removed`);
    });

    done();
}

exports.watchImg = watchImgTask;




// gulp.task('watch', gulp.series('some-task-name', function () {
//     browserSync.init({
//         server: {
//             baseDir: config.distFolder + ''
//         }
//     });

//     var watcher = gulp.watch([
//                      'app/js/**/*.js', 
//                         'app/scss/**/*.scss', 
//                         'app/img/"**/*.+(png|jpg|gif|svg)'
//                     ],
//                     gulp.series('some-task-name'));
//     watcher.on('change', async function (path, stats) {
//         console.log('you changed the code');
//         browserSync.notify("Compiling, please wait!");
//         browserSync.reload();
//     })
// }));

