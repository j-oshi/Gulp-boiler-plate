const { task, watch, parallel, series } = require('gulp');

const cleanFolders = require('./gulp/tasks/cleanFolders');
const css = require('./gulp/tasks/css');
const js = require('./gulp/tasks/script');
const img = require('./gulp/tasks/media');

task('buildCss', css.task);
task('buildJs', js.task);
// const buildCssJs = parallel(css.task, js.task, img.task);

// const build = series(cleanFolders.task, buildCssJs)

// task('buildCssJs', build);



// function watchTask(done){
//     // watch(['app/js/*.js'], function(cb) {
//     // // body omitted
//     // console.log("HTTP Server Started");
//     // cb();
//     // });


//     const watcher = watch(['app/js/*.js']);

//     watcher.on('change', function(path, stats) {
//       console.log(`File ${path} was changed`);
//     });
    
//     watcher.on('add', function(path, stats) {
//       console.log(`File ${path} was added`);
//     });
    
//     watcher.on('unlink', function(path, stats) {
//       console.log(`File ${path} was removed`);
//     });

//     console.log("HTTP Server Started");
    
//     // watcher.close();

//     done();
// }

// exports.default = watchTask;

// const { watch, task } = require('gulp');

// const tests = function test(done) {
//     const watcher = watch(['app/js/*.js']);

//     watcher.on('change', function(path, stats) {
//       console.log(`File ${path} was changed`);
//     });
    
//     watcher.on('add', function(path, stats) {
//       console.log(`File ${path} was added`);
//     });
    
//     watcher.on('unlink', function(path, stats) {
//       console.log(`File ${path} was removed`);
//     });

//     console.log("HTTP Server Started");
    
//     watcher.close();

//     done();
// };

// task('watch', tests);

// gulp.task('watch', gulp.series('some-task-name', function () {
//     browserSync.init({
//         server: {
//             baseDir: config.distFolder + ''
//         }
//     });

//     var watcher = gulp.watch([
//                     './src/views/*.html', 
//                     './src/index.html', 
//                     './src/assets/css/*.css', 
//                     './src/**/*.js'],
//                     gulp.series('some-task-name'));
//     watcher.on('change', async function (path, stats) {
//         console.log('you changed the code');
//         browserSync.notify("Compiling, please wait!");
//         browserSync.reload();
//     })
// }));

