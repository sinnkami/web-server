const gulp = require('gulp');
const args = require('./lib/value');

gulp.task('routes', function() {
    return gulp.src(`${args.src}/routes/**/*.js`)
        .pipe(gulp.dest(`${args.dest}/routes`));
});
