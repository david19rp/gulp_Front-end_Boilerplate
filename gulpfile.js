const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

gulp.task('sass',function ()  {
    return gulp.src('app/sass/style.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task ('js',function(){
        return gulp.src('app/script.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
})

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'dist'
      },
    })
  })

  gulp.task ('html',function(){
    return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('assets',()=>{
    gulp.src(`app/img/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(`dist/img/`))
});

gulp.task ('watch',['browserSync','sass'], function(){
    gulp.watch('app/sass/*.scss',['sass'])
    gulp.watch('app/script.js',['js'])
    gulp.watch('app/img/*',['assets'])
    gulp.watch('app/*.html',['html'])
    gulp.watch('app/**/*').on('change', browserSync.reload);
})


gulp.task('default',['sass','js','watch','html','assets']);
gulp.task('build',['sass','js','html','assets']);
