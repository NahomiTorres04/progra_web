//API de gulp
const { src, dest, series, parallel, watch } = require('gulp');

//Paquetes
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const css = require('gulp-clean-css');
const js = require('gulp-minify');

//Constantes
const files = {
    scssPath: 'src/scss/**/.scss',
    cssPath: 'dist/css/**/*.css',
    htmlPath: 'dist/**/*.html',
    jsPath: 'src/js/**/*.js'
}

//Tasks
function scssTask(done) {
    return src(files.scssPath)
        .pipe(sass())
        .pipe(dest('./dist/css/'));
}


function jsTask(done) {
    return src(files.jsPath)
    .pipe(js())
    .pipe(dest('./dist/js'));
}

function cssTask(done) {
    return src(files.cssPath)
    .pipe(css())
    .pipe(dest('./dist/css/'));
}

function watchTask(done) {
    watch(
        [files.scssPath, files.htmlPath],
        series(scssTask, cssTask, jsTask, reloadTask)
    );
}

function serveTask(done) {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    done();
}

function reloadTask(done) {
    browserSync.reload();
    done();
}

exports.default = series(scssTask, cssTask, jsTask, serveTask, watchTask);