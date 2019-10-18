const gulp = require('gulp');
const args = require('./lib/value');

gulp.task('bin', () => {
    return gulp.src(`${args.src}/bin/www`)
        .pipe(gulp.dest(`${args.dest}/bin/`));
});
