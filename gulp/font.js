const gulp = require('gulp');
const args = require('./lib/value');

gulp.task('font', function() {
    return gulp.src(`${args.src}/public/font/**/*`)
        .pipe(gulp.dest(`${args.dest}/public/font/`));
});
