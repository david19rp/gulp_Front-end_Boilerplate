const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
//compile scss into css
function style() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function jsFiles() {
    return gulp.src('./app/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
            // index: "./index.html"
        }
    });
    gulp.watch('app/scss/**/*.scss', style)
    gulp.watch('app/js/**/*.js', jsFiles)
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('/.all.js').on('change', browserSync.reload);
}
exports.style = style;
exports.jsFiles = jsFiles;
exports.watch = watch;
