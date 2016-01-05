var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  htmlMinify = require('gulp-minify-html'),
  cssMinify = require('gulp-minify-css'),
  jsMinify = require('gulp-minify'),
  del = require('del');

gulp.task('default', ['batch', 'watch']);

// HTML Minify to ./build/
gulp.task('htmlProcess', function() {
  return gulp.src('./src/**/*.html')
    .pipe(htmlMinify().on('error', console.log))
    .pipe(gulp.dest('./build/'));
});
gulp.task('hbsProcess', function() {
  return gulp.src('./src/**/*.hbs')
    .pipe(htmlMinify().on('error', console.log))
    .pipe(gulp.dest('./build/'));
});

// SCSS Transpile to ./build/css
gulp.task('scssProcess', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css/'));
});

// CSS concat & minify to ./build/style
gulp.task('cssProcess', function() {
  return gulp.src('./src/css/**/*.css')
    .pipe(concat('app.css').on('error', console.log))
    .pipe(cssMinify().on('error', console.log))
    .pipe(gulp.dest('./build/style/'));
});

// Javascript concat & minify to ./src/script
gulp.task('jsProcess', function() {
  return gulp.src('./src/script/**/*.js')
    .pipe(concat('app.js').on('error', console.log))
    .pipe(jsMinify().on('error', console.log))
    .pipe(gulp.dest('./build/script'));
});
gulp.task('jsClean', function() {
  del(['./build/script/app.js']);
});


// Watchem
gulp.task('batch', ['htmlProcess', 'hbsProcess', 'scssProcess', 'cssProcess', 'jsProcess', 'jsClean']);
gulp.task('watch', function() {
  gulp.watch('./src/**/*.html', ['htmlProcess']);
  gulp.watch('./src/**/*.hbs', ['hbsProcess']);
  gulp.watch('./src/scss/**/*.scss', ['scssProcess']);
  gulp.watch('./src/css/**/*.css', ['cssProcess']);
  gulp.watch('./src/script/**/*.js', ['jsProcess']);
  gulp.watch('./build/script/app-min.js', ['jsClean']);
});
