var gulp        = require('gulp'),
    browserify  = require('gulp-browserify');

gulp.task('build', function() {
  gulp.src('client/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(gulp.dest('client/bin/'))
});
