const gulp = require('gulp');
const args = require('./lib/value');

gulp.task('config', function() {
    return gulp.src(`${args.src}/config/**/*`)
        .pipe(gulp.dest(`${args.dest}/config`));
});
