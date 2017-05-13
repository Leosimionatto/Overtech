var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('minify-views', function(){
  return gulp.src('views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/views'));
});

gulp.task('minify-css', function(){
  return gulp.src('design/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compress-controllers', function (cb) {
  pump([
        gulp.src('js/controllers/*.js'),
        uglify({mangle:false}),
        gulp.dest('dist/js/controllers')
    ],
    cb
  );
});

gulp.task('compress-directives', function (cb) {
  pump([
        gulp.src('js/directives/*.js'),
        uglify({mangle:false}),
        gulp.dest('dist/js/directives')
    ],
    cb
  );
});

gulp.task('compress-routes', function (cb) {
  pump([
        gulp.src('js/routes/*.js'),
        uglify({mangle:false}),
        gulp.dest('dist/js/routes')
    ],
    cb
  );
});
