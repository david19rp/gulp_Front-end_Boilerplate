const gulp = require('gulp'); 
const cssnano = require('gulp-cssnano'); 
const sass = require('gulp-sass'); 
const concat = require('gulp-concat'); 
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

gulp.task('sass',function ()  {
    return gulp.src('app/style.scss')
    .pipe(sass())
    .pipe(cssnano()) 
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task ('js',function(){
        return gulp.src('script.js')
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

gulp.task ('watch',['browserSync','sass'], function(){
    gulp.watch('app/style.scss',['sass'])
    gulp.watch('script.js',['js'])
    gulp.watch('app/*.html',['html']).on('change', browserSync.reload);
})


gulp.task('default',['sass','js','watch','html']);
