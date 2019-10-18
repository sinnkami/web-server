const gulp = require('gulp');
const args = require('./lib/value');

gulp.task('json', function() {
    return gulp.src(`${args.src}/public/json/**/*`)
        .pipe(gulp.dest(`${args.dest}/public/json/`));
});
